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

it('does not allow guests to delete expenses', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create();

    $response = $this->delete(route('budgets.expenses.destroy', [$budget, $expense]));
    $response->assertRedirect(route('login'));
    $this->assertDatabaseHas('expenses', [
        'id' => $expense->id,
    ]);
});

it('does not allow unverified users to delete expenses', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create();

    $response = $this->actingAs($user)
        ->delete(route('budgets.expenses.destroy', [$budget, $expense]));

    $response->assertRedirect(route('verification.notice'));
    $this->assertDatabaseHas('expenses', [
        'id' => $expense->id,
    ]);
});

it('does not allow other users to delete expenses they do not own', function () {
    $owner = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($owner)->create([
        'type' => 'general',
    ]);

    $expense = Expense::factory()->for($budget)->create([
        'name' => 'Supermercado',
    ]);

    $response = $this->actingAs($otherUser)
        ->delete(route('budgets.expenses.destroy', [$budget, $expense]));

    $response->assertForbidden();

    $this->assertDatabaseHas('expenses', [
        'id' => $expense->id,
    ]);
});

it('adds an undo url when deleting an expense', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->create();
    $expense = Expense::factory()->for($budget)->create();

    $this->actingAs($user)
        ->delete(route('budgets.expenses.destroy', [$budget, $expense]))
        ->assertSessionHas('undo', route('budgets.expenses.restore', [$budget, $expense]));

    $this->assertSoftDeleted($expense);
});

it('allows the owner to restore a deleted expense', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->create();
    $expense = Expense::factory()->for($budget)->create(['deleted_at' => now()]);

    $this->actingAs($user)
        ->from(route('budgets.show', $budget))
        ->patch(route('budgets.expenses.restore', [$budget, $expense]))
        ->assertRedirect(route('budgets.show', $budget));

    $this->assertNotSoftDeleted($expense);
});

it('does not allow other users to restore an expense', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $otherUser = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($owner)->create();
    $expense = Expense::factory()->for($budget)->create(['deleted_at' => now()]);

    $this->actingAs($otherUser)
        ->patch(route('budgets.expenses.restore', [$budget, $expense]))
        ->assertForbidden();

    $this->assertSoftDeleted($expense);
});

it('does not restore an expense through another budget', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->create();
    $otherBudget = Budget::factory()->for($user)->create();
    $expense = Expense::factory()->for($otherBudget)->create(['deleted_at' => now()]);

    $this->actingAs($user)
        ->patch(route('budgets.expenses.restore', [$budget, $expense]))
        ->assertNotFound();

    $this->assertSoftDeleted($expense);
});

