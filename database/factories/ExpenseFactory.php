<?php

namespace Database\Factories;

use App\Enums\ExpenseCategory;
use App\Models\Budget;
use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'amount' => fake()->randomFloat(2, 50, 5000),
            'category' => fake()->randomElement(ExpenseCategory::cases())->value,
            'budget_id' => Budget::factory(),

        ];
    }
}
