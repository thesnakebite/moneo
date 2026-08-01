<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

uses (RefreshDatabase::class);

it('shows the registration screen', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
    $response->assertStatus(200);
    $response->assertSee('Crear una cuenta');
});

it('register a new user as unverified and dispatches the registered event', function () {

    Event::fake();

    $response = $this->post(route('register.store'), [
        'name' => 'Juan Pérez',
        'email' => 'juan@juan.com',
        'password' => 'password12A$',
        'password_confirmation' => 'password12A$'
    ]);

    $response->assertRedirect(route('verification.notice'));

    $user = User::where('email', 'juan@juan.com')->first();

    expect($user)->not->toBeNull();
    expect($user->name)->toBe('Juan Pérez');
    expect($user->email)->toBe('juan@juan.com');
    expect($user->hasVerifiedEmail())->toBeFalse();

    Event::assertDispatched(Registered::class);
});

it('should validate required fields when the request body is empty', function () {
    $response = $this->post(route('register.store'), []);

    $response->assertSessionHasErrors([
        'name',
        'email',
        'password',
    ]);

    $response->assertSessionHasErrors([
        'name' => 'El nombre es obligatorio.',
        'email' => 'El email es obligatorio.',
        'password' => 'La contraseña es obligatoria.',
    ]);
});
