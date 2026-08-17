<?php

use App\Models\Budget;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the expense owner to delete an expense', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create([
        'name' => 'Supermercado',
    ]);

    $response = $this->actingAs($user)->delete(route('budgets.expenses.destroy', [$budget, $expense]));
    $response->assertRedirect(route('budgets.show', $budget));
    $response->assertSessionHas('success', 'Gasto eliminado correctamente');

    $this->assertSoftDeleted('expenses', [
        'id' => $expense->id,
    ]);
});
