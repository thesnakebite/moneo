<?php

use Inertia\Testing\AssertableInertia as Assert;
use App\Models\Budget;
use App\Models\User;
use App\Models\Expense;
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
        ->has('activeBudgets', 0)
        ->has('finishedBudgets', 0)
        ->where('summary.attention', 0)
        ->where('summary.finished', 0)
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

it('summarizes only active budgets in the dashboard header', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    $nearLimit = Budget::factory()->for($user)->create(['amount' => 1000, 'ends_at' => null]);
    Expense::factory()->for($nearLimit)->create(['amount' => 950]);

    $healthy = Budget::factory()->for($user)->create(['amount' => 500, 'ends_at' => null]);
    Expense::factory()->for($healthy)->create(['amount' => 100]);

    $finished = Budget::factory()->for($user)->create(['amount' => 200, 'ends_at' => today()->subDay()]);
    Expense::factory()->for($finished)->create(['amount' => 300]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->where('summary.managed', fn ($value) => (float) $value === 1500.0)
            ->where('summary.spent', fn ($value) => (float) $value === 1050.0)
            ->where('summary.attention', 1)
            ->where('summary.finished', 1)
        );
});

it('counts budgets at 90% or more as requiring attention', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    $atThreshold = Budget::factory()->for($user)->create(['amount' => 100, 'ends_at' => null]);
    Expense::factory()->for($atThreshold)->create(['amount' => 90]);

    $belowThreshold = Budget::factory()->for($user)->create(['amount' => 100, 'ends_at' => null]);
    Expense::factory()->for($belowThreshold)->create(['amount' => 89]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('summary.attention', 1)
        );
});
