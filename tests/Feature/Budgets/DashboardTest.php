<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows empty state when the user has no budgets', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response= $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk();
    $response->assertSee('No hay presupuestos.');
    $response->assertSee('Comienza creando uno');
});
