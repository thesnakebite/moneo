<?php

use Inertia\Testing\AssertableInertia as Assert;
use App\Models\Budget;
use App\Models\User;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the owner to restore a trashed budget', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->trashed()->create();

    $response = $this->actingAs($user)->patch(route('budgets.restore', $budget));

    $response->assertRedirect(route('dashboard', ['tab' => 'trash']));
    $this->assertNotSoftDeleted($budget);
});

it('does not allow other users to restore a budget', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $otherUser = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($owner)->trashed()->create();

    $response = $this->actingAs($otherUser)->patch(route('budgets.restore', $budget));

    $response->assertForbidden();
    $this->assertSoftDeleted($budget);
});

it('does not allow guests to restore a budget', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->trashed()->create();

    $response = $this->patch(route('budgets.restore', $budget));

    $response->assertRedirect(route('login'));
    $this->assertSoftDeleted($budget);
});

it('returns not found when restoring a budget that is not trashed', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->create();

    $response = $this->actingAs($user)->patch(route('budgets.restore', $budget));

    $response->assertNotFound();
});

it('allows the owner to permanently delete a trashed budget with its expenses', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->trashed()->create();
    Expense::factory()->count(2)->for($budget)->create();

    $response = $this->actingAs($user)->delete(route('budgets.force-delete', $budget));

    $response->assertRedirect(route('dashboard', ['tab' => 'trash']));
    $this->assertDatabaseMissing('budgets', ['id' => $budget->id]);
    $this->assertDatabaseMissing('expenses', ['budget_id' => $budget->id]);
});

it('does not allow other users to permanently delete a budget', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $otherUser = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($owner)->trashed()->create();

    $response = $this->actingAs($otherUser)->delete(route('budgets.force-delete', $budget));

    $response->assertForbidden();
    $this->assertSoftDeleted($budget);
});

it('does not permanently delete a budget that is not in the trash', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $budget = Budget::factory()->for($user)->create();

    $response = $this->actingAs($user)->delete(route('budgets.force-delete', $budget));

    $response->assertNotFound();
    $this->assertNotSoftDeleted($budget);
});

it('lists trashed budgets separately and excludes them from the summary', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $active = Budget::factory()->for($user)->create(['ends_at' => null]);
    $trashed = Budget::factory()->for($user)->trashed()->create(['ends_at' => null]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->has('activeBudgets', 1)
        ->where('activeBudgets.0.id', $active->id)
        ->has('finishedBudgets', 0)
        ->has('trashedBudgets', 1)
        ->where('trashedBudgets.0.id', $trashed->id)
    );
});

it('does not show trashed budgets from other users', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $otherUser = User::factory()->create(['email_verified_at' => now()]);
    Budget::factory()->for($otherUser)->trashed()->create();

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('trashedBudgets', 0)
    );
});
