<?php

namespace App\Ai\Tools;

use App\Enums\ExpenseCategory;
use App\Models\Expense;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;

class AddExpense implements Tool
{
    public function __construct(
        public int $budgetId,
        public bool $hasCategories = true,
    ) {}

    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        if ($this->hasCategories) {
            return 'Agrega un nuevo gasto al presupuesto actual, requiere nombre, importe y categoría.';
        }

        return 'Agrega un nuevo gasto al presupuesto actual, requiere nombre e importe. La categoría no aplica a este tipo de presupuestos.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $name = $request['name'] ?? null;
        $amount = $request['amount'] ?? null;

        if (!$name || !$amount) {
            return '[EXPENSE_ERROR] Se necesita un nombre y un importe para agregar el gasto.';
        }

        $data = [
            'budget_id' => $this->budgetId,
            'name' => $name,
            'amount' => $amount,
        ];

        if ($this->hasCategories && ($request['category'] ?? null)) {
            $category = ExpenseCategory::tryFrom($request['category']);
            if ($category) {
                $data['category'] = $category->value;
            }
        }

        $expense = Expense::create($data);

        $cat = $expense->category ? $expense->category->label() : 'Sin categoría';

        return "[EXPENSE_CREATED] Gasto agregado exitosamente: {$expense->name} por {$expense->amount}€ ({$cat})";
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()->description('Nombre del gasto (ej: Cemento, Uber, Renta)')->required(),
            'amount' => $schema->number()->description('Importe del gasto en número (ej: 30, 100.50)')->required(),
            'category' => $schema->string()->description('Categoría del gasto. Valores permitidos: food, transport, housing, leisure, health, shopping, other'),
        ];
    }
}
