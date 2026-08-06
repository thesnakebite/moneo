<?php

use App\Models\Budget;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows the owner to view the edit budget form', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $budget = Budget::factory()->for($user)->create([
        'name' => 'Viaje a las Vegas 🎰',
        'amount' => 1000,
        'type' => 'general',
    ]);

    $response = $this->actingAs($user)->get(route('budgets.edit', $budget));

    $response->assertOk();
    $response->assertSee('Viaje a las Vegas 🎰');
});
