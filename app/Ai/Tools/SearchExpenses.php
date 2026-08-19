<?php

namespace App\Ai\Tools;

use App\Models\Expense;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;

class SearchExpenses implements Tool
{
    public function __construct(
        public int $budgetId,
    ){}

    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        return 'Busca y consulta los gastos del presupuesto actual. Permite filtrar por nombre, categoría, '
        .'obtener el gasto más caro o más barato, calcular totales, o listar todos los gastos registrados.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $query = Expense::where('budget_id', $this->budgetId);

        if ($request['name'] ?? null) {
            $query->where('name', 'ilike', '%' . $request['name'] . '%');
        }

        if ($request['category'] ?? null) {
            $query->where('category', 'ilike', '%' . $request['category'] . '%');
        }

        $expenses = $query->get(['name', 'amount', 'category', 'created_at']);

        if ($expenses->isEmpty()) {
            return 'No se encontraron gastos con esos criterios.';
        }

        $total = $expenses->sum('amount');

        return "Gastos encontrados ({$expenses->count()}):\n" .
        $expenses->map(function ($e) {
            $cat = $e->category ? $e->category->label() : 'Sin categoría';
            return "- {$e->name}: {$e->amount}€ ({$cat})";
        })->implode("\n") .
        "\n\nTotal: {$total}€";
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()->description(
                'Filtra los gastos por nombre. Búsqueda parcial e insensible a mayúsculas, por ejemplo "uber" '
                . 'encontraría "Uber Eats". Déjalo vacío si el usuario no menciona ningún gasto en concreto.'
            ),
            'category' => $schema->string()->description(
                'Filtra los gastos por categoría. Valores válidos: food, transport, housing, leisure, health, '
                . 'shopping, other. Solo aplica a presupuestos de tipo General; ignora este parámetro en '
                . 'presupuestos de tipo Meta/Objetivo.'
            ),
        ];
    }
}
