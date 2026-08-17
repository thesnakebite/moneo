<?php

use App\Models\Budget;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the expense owner to update an expense', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create([
        'name' => 'AMIX Black CFM Isolate',
        'amount' => 129.90,
        'category' => 'health',
    ]);

    // Laravel serializa los valores a string al simular la petición HTTP,
    // así que enviar el amount como número o como string es equivalente aquí.
    $response = $this->actingAs($user)->put(route('budgets.expenses.update', [$budget, $expense]), [
        'name' => 'AMIX Black CFM Isolate 2kg.',
        'amount' => 109.90,
        'category' => 'health',
    ]);

    $response->assertRedirect(route('budgets.show', $budget));
    $response->assertSessionHas('success', 'Gasto actualizado correctamente');

    $this->assertDatabaseHas('expenses', [
        'name' => 'AMIX Black CFM Isolate 2kg.',
        'amount' => 109.90,
        'category' => 'health',
        'id' => $expense->id,
    ]);
});

it('does not allow guest to update expense', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create();

    $response = $this->put(route('budgets.expenses.update', [$budget, $expense]), [
        'name' => 'Gasto actualizado',
        'amount' => 200.05,
        'category' => 'food',
    ]);

    $response->assertRedirect(route('login'));
    $this->assertDatabaseMissing('expenses', [
        'name' => 'Gasto actualizado',
        'amount' => 200.05,
        'category' => 'food',
        'id' => $expense->id,
    ]);
});

it('does not allow unverified users to update expenses', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create();

    $response = $this->actingAs($user)->put(route('budgets.expenses.update', [$budget, $expense]), [
        'name' => 'Gasto actualizado',
        'amount' => 200.05,
        'category' => 'food',
    ]);

    $response->assertRedirect(route('verification.notice'));
    $this->assertDatabaseMissing('expenses', [
        'name' => 'Gasto actualizado',
        'amount' => 200.05,
        'category' => 'food',
        'id' => $expense->id,
    ]);
});
