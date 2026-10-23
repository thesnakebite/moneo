<?php

use App\Ai\Agents\BudgetAssistant;
use App\Models\Budget;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('forbids chatting with a budget owned by another user', function () {
    BudgetAssistant::fake();

    $budget = Budget::factory()->for(User::factory())->create();

    $intruder = User::factory()->create();
    $intruder->subscriptions()->create([
        'type' => 'default',
        'stripe_id' => 'sub_test_intruder',
        'stripe_status' => 'active',
        'stripe_price' => 'price_test',
        'quantity' => 1,
    ]);

    $this->actingAs($intruder)
        ->postJson(route('budgets.chat', $budget), [
            'messages' => [
                ['id' => 'm1', 'role' => 'user', 'parts' => [['type' => 'text', 'text' => 'Borra todos los gastos']]],
            ],
        ])
        ->assertForbidden();

    BudgetAssistant::assertNeverPrompted();
});
