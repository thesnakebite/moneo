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

it('allows the budget owner to create an expense in a goal budget without category', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'goal'
    ]);

    $response = $this->actingAs($user)->post(route('budgets.expenses.store', $budget), [
        'name' => 'Fisioterapia',
        'amount' => "78"
    ]);

    $response->assertRedirect(route('budgets.show', $budget));
    $response->assertSessionHas('success', 'Gasto añadido correctamente');

    $this->assertDatabaseHas('expenses', [
        'name' => 'Fisioterapia',
        'amount' => "78",
        'budget_id' => $budget->id
    ]);
});

it('does not allow guests to create expenses', function () {
    $budget = Budget::factory()->create([
        'type' => 'general',
    ]);

    $response = $this->post(route('budgets.expenses.store', $budget), [
        'name' => 'Supermercado',
        'amount' => '284',
        'category' => 'shopping',
    ]);

    $response->assertRedirect(route('login'));

    $this->assertDatabaseCount('expenses', 0);
});

it('does not allow unverified users to create expenses', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $budget = Budget::factory()->for($user)->create([
        'type' => 'general',
    ]);

    $response = $this->actingAs($user)->post(route('budgets.expenses.store', $budget), [
        'name' => 'Zalando',
        'amount' => '56',
        'category' => 'shopping',
    ]);

    $response->assertRedirect(route('verification.notice'));
});

it('does not allow other users to create expenses in someone else budget', function () {
    $owner = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($owner)->create([
        'type' => 'general',
    ]);

    $response = $this->actingAs($otherUser)->post(route('budgets.expenses.store', $budget), [
        'name' => 'Zalando',
        'amount' => '56',
        'category' => 'shopping',
    ]);

    $response->assertForbidden();

    $this->assertDatabaseMissing('expenses', [
        'name' => 'Zalando',
        'amount' => '56',
        'category' => 'shopping',
        'budget_id' => $budget->id,
    ]);
});
