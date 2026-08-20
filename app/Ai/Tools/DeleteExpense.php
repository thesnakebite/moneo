<?php

namespace App\Ai\Tools;

use App\Models\Expense;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;

class DeleteExpense implements Tool
{
    public function __construct(
        public int $budgetId,
    ) {}

    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        return 'Elimina un gasto existente del presupuesto actual. Requiere el nombre exacto o aproximado del gasto a eliminar.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $name = $request['name'] ?? null;

        if (!$name) {
            return '[EXPENSE_ERROR] Necesito el nombre del gasto que quieres eliminar.';
        }

        $matches = Expense::where('budget_id', $this->budgetId)
            ->where('name', 'ilike', '%'.$name.'%')
            ->get();

        if ($matches->count() > 1) {
            $list = $matches->pluck('name')->implode(', ');
            return "[EXPENSE_AMBIGUOUS] Encontré varios gastos que coinciden: {$list}. ¿Cuál quieres eliminar exactamente?";
        }

        $expense = $matches->first();

        if (!$expense) {
            return "[EXPENSE_ERROR] No encontré ningún gasto que coincida con '{$name}'.";
        }

        $deletedName = $expense->name;
        $expense->delete();

        return "[EXPENSE_DELETED] El gasto '{$deletedName}' fue eliminado correctamente.";
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()->description('Nombre del gasto a eliminar (búsqueda parcial)')->required(),
        ];
    }
}
