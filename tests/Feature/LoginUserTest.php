<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows the login screen', function () {
    $response = $this->get(route('login'));

    $response->assertOk();
});

it('logs in a verified user successfully', function () {
    $user = User::factory()->create([
        'email' => 'juan@juan.com',
        'password' => bcrypt('password'),
        'email_verified_At' => now(),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => 'juan@juan.com',
        'password' => 'password'
    ]);

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticated();
});

it('does not log in with invalid credentials', function () {
    User::factory()->create([
        'email' => 'juan@juan.com',
        'password' => bcrypt('password')
    ]);

    $response = $this->from(route('login'))->post(route('login.store'), [
        'email' => 'juan@juan.com',
        'password' => 'incorrect-password'
    ]);

    $response->assertRedirect(route('login'));
    $response->assertSessionHasErrors([
        'email' => 'Las credenciales no coinciden con nuestros registros.',
    ]);

    $this->assertGuest();
});
