<?php

use Inertia\Testing\AssertableInertia as Assert;
use App\Models\Budget;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows empty state when the user has no budgets', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->has('budgets', 0)
    );
});

it('only shows the authenticated user budgets', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now()
    ]);

    Budget::factory()->for($user)->create([
        'name' => 'Mi presupuesto'
    ]);

    Budget::factory()->for($otherUser)->create([
        'name' => 'Otro presupuesto'
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk();
    $response->assertSee('Mi presupuesto');
    $response->assertDontSee('Otro presupuesto');
});

it('splits budgets into active and finished by end date', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    Budget::factory()->for($user)->create(['name' => 'Sin fecha', 'ends_at' => null]);
    Budget::factory()->for($user)->create(['name' => 'Termina hoy', 'ends_at' => today()]);
    Budget::factory()->for($user)->create(['name' => 'Terminó ayer', 'ends_at' => today()->subDay()]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->has('activeBudgets', 2)
            ->has('finishedBudgets', 1)
            ->where('finishedBudgets.0.name', 'Terminó ayer')
        );
});
