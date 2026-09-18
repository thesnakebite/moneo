<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAvatarRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\AccountDeletion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
class UpdateProfileController extends Controller
{
    public function edit(): Response
    {
        $user = auth()->user();

        return Inertia::render('Profile/UpdateProfile', [
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar_url' => $user->avatar_path ? Storage::disk('public')->url($user->avatar_path) : null,
            ],
        ]);
    }

    public function update(UpdateProfileRequest $request): Response|RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $emailChanged = $validated['email'] !== $user->email;
        $user->fill($validated);

        if ($emailChanged) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($emailChanged) {
            $user->sendEmailVerificationNotification();

            return redirect()
                ->route('verification.notice')
                ->with('success', 'Perfil actualizado. Confirma tu nuevo email para seguir usando la app.');
        }

        return redirect()
            ->route('settings.profile')
            ->with('success', 'Perfil actualizado correctamente.');
    }

    public function verifyEmailNotice(): Response
    {
        return Inertia::render('Profile/VerifyEmail');
    }

    public function updateAvatar(UpdateAvatarRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Borra el avatar anterior si existe, para no acumular archivos huérfanos
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->update(['avatar_path' => $path]);

        return redirect()
            ->route('settings.profile')
            ->with('success', 'Foto de perfil actualizada correctamente.');
    }

    public function confirmDelete(): Response
    {
        $user = auth()->user();

        return Inertia::render('Profile/DeleteAccount', [
            'subscribed' => $user->subscribed(),
            'plan' => $user->currentPlan(),
        ]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        abort_if($user->subscribed(), 403, 'No puedes eliminar tu cuenta mientras tengas una suscripción activa.');

        AccountDeletion::create([
            'email' => $user->email,
            'reason' => $request->input('reason'), // optional: can be null
        ]);

        // Delete avatar before delete
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        auth()->logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')
            ->with('success', 'Tu cuenta hah sido eliminada del sistema de Moneo.');
    }
}
