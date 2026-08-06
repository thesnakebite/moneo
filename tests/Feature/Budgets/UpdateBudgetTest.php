<?php

use App\Models\Budget;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the owner to update a budget', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'name' => 'Presupuesto',
        'amount' => 1500,
        'type' => 'general'
    ]);

    $response = $this->actingAs($user)->put(route('budgets.update', $budget), [
        'name' => 'Presupuesto actualizado',
        'amount' => 1000,
        'type' => 'goal',
    ]);

    $response->assertRedirect(route('dashboard'));

    $this->assertDatabaseHas('budgets', [
        'id' => $budget->id,
        'name' => 'Presupuesto actualizado',
        'amount' => 1000,
        'type' => 'goal',
        'user_id' => $user->id,
    ]);
});

it('validates required fields when updating a budget', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create();

    $response = $this->actingAs($user)
        ->from(route('budgets.edit', $budget))
        ->put(route('budgets.update', $budget), [
            'name' => '',
            'amount' => '',
            'type' => '',
        ]);

    $response->assertRedirect(route('budgets.edit', $budget));
    $response->assertSessionHasErrors([
        'name',
        'amount',
        'type',
    ]);
});
