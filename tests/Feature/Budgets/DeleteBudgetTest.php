<?php

use App\Models\Budget;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the owner to delete a budget', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create();

    $response = $this->actingAs($user)->delete(route('budgets.destroy', $budget));

    $response->assertRedirect(route('dashboard'));

    $this->assertSoftDeleted('budgets', [
        'id' => $budget->id
    ]);
});
