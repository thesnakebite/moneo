<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
class UpdateProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Profile/UpdateProfile', [
            'profile' => auth()->user()->only('name', 'email')
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
}
