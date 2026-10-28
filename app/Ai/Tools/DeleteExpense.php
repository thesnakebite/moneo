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
        public string $budgetId,
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
        $amount = $request['amount'] ?? null;

        if (!$name) {
            return '[EXPENSE_ERROR] Necesito el nombre del gasto que quieres eliminar.';
        }

        $matches = Expense::where('budget_id', $this->budgetId)
            ->whereLike('name', '%'.$name.'%')
            ->when(is_numeric($amount), fn ($query) => $query->where('amount', $amount))
            ->get();

        // Si una coincide exactamente con el nombre, es esa ("Uber" frente a "Uber Eats")
        if ($matches->count() > 1) {
            $exact = $matches->filter(fn (Expense $expense) => mb_strtolower($expense->name) === mb_strtolower($name));

            if ($exact->count() === 1) {
                $matches = $exact;
            }
        }

        if ($matches->count() > 1) {
            $list = $matches
                ->map(fn (Expense $expense) => "{$expense->name} ({$expense->amount}€, {$expense->created_at->format('d/m/Y')})")
                ->implode('; ');

            return "[EXPENSE_AMBIGUOUS] Encontré varios gastos que coinciden: {$list}. Pregunta al usuario cuál quiere eliminar; puedes usar el importe para distinguirlos.";
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
            'name' => $schema->string()
                ->description('Nombre del gasto a eliminar (búsqueda parcial e insensible a mayúsculas).')
                ->required(),
            'amount' => $schema->number()
                ->min(0.01)
                ->description('Importe exacto del gasto. Úsalo solo para distinguir entre varios gastos con nombre parecido.'),
        ];
    }
}
