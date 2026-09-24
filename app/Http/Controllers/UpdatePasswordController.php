<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
class UpdatePasswordController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Profile/UpdatePassword');
    }

    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => Hash::make($request->validated('password')),
        ]);

        return redirect()
            ->route('settings.profile')
            ->with('success', 'Contraseña actualizada correctamente.');
    }
}
