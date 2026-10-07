<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(ContactRequest $request): RedirectResponse
    {
        $key = 'contact:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 3)) {
            $minutes = (int) ceil(RateLimiter::availableIn($key) / 60);

            return back()->withErrors([
                'message' => "Has enviado varios mensajes seguidos. Inténtalo de nuevo en {$minutes} minutos.",
            ]);
        }

        RateLimiter::hit($key, 600);

        $data = $request->validated();

        Mail::to(config('services.contact.address'))->send(
            new ContactMessage($data['name'], $data['email'], $data['message'])
        );

        return back()->with('success', 'Mensaje enviado. Te responderé lo antes posible.');
    }
}
