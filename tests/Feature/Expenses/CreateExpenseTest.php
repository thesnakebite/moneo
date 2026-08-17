<?php

use App\Models\Budget;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the budget owner to create an expense in a general budget', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general'
    ]);

    $response = $this->actingAs($user)->post(route('budgets.expenses.store', $budget), [
        'name' => 'Dentista',
        'amount' => "78",
        'category' => 'health'
    ]);

    $response->assertRedirect(route('budgets.show', $budget));
    $response->assertSessionHas('success', 'Gasto añadido correctamente');

    $this->assertDatabaseHas('expenses', [
        'name' => 'Dentista',
        'amount' => "78",
        'category' => 'health',
        'budget_id' => $budget->id
    ]);
});
