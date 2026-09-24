<?php

namespace App\Http\Controllers\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/ForgotPassword');

    }

    public function store(ForgotPasswordRequest $request): RedirectResponse
    {
        Password::sendResetLink(
            $request->only('email')
        );

        return back()->with('success', 'Te hemos enviado un enlace para restablecer tu contraseña.');
    }
}
