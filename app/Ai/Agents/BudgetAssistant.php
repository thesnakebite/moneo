<?php

namespace App\Ai\Agents;

use App\Ai\Tools\AddExpense;
use App\Ai\Tools\DeleteExpense;
use App\Ai\Tools\SearchExpenses;
use App\Enums\ExpenseCategory;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Promptable;
use Stringable;

class BudgetAssistant implements Agent, Conversational, HasTools
{
    use Promptable;

    public string $budgetId;
    public string $budgetContext = '';
    public bool $hasCategories = true;

    /** @var array<int, \Laravel\Ai\Messages\Message> */
    public array $history = [];

    public function messages(): iterable
    {
        return $this->history;
    }

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        $categories = collect(ExpenseCategory::cases())
            ->map(fn ($category) => "- {$category->label()} → valor para AddExpense: {$category->value}")
            ->implode("\n");

        return <<<PROMPT
        Eres un asistente financiero personal para un presupuesto específico.
        Tu función es responder preguntas sobre los gastos, agregar nuevos gastos y eliminar los que el usuario indique.

        {$this->budgetContext}

        Reglas para consultar gastos:
        - Si el usuario pregunta sobre gastos, importes, lo más caro, lo más barato, totales o cualquier consulta sobre su presupuesto, usa la herramienta SearchExpenses.

        Reglas para agregar gastos:
        - Si el usuario quiere agregar, registrar o anotar un gasto, usa la herramienta AddExpense.
        - Si el presupuesto es de tipo General y el usuario NO menciona categoría, deduce la categoría más apropiada según el nombre del gasto. Por ejemplo: "Uber" → **Transporte**, "Pizza" → **Comida**, "Netflix" → **Suscripciones**, "Dentista" → **Salud**, "Lámpara de salón" → **Decoración**.
        - Estas son las ÚNICAS categorías válidas:
        {$categories}
        - Al hablar con el usuario, nombra SIEMPRE las categorías por su nombre en español y en negrita (por ejemplo **Decoración**). El valor técnico solo se usa dentro de AddExpense y NUNCA aparece en tus respuestas.
        - Si no puedes deducir la categoría con certeza, sugiérele las opciones más probables por su nombre en negrita y pregúntale cuál prefiere.
        - Si el presupuesto es de tipo Meta/Objetivo, no uses categoría.

        Reglas para eliminar gastos:
        - Antes de usar DeleteExpense, confirma con el usuario qué gasto quiere eliminar, indicando su nombre e importe, y espera a que lo confirme.
        - Si DeleteExpense encuentra varios gastos, muéstraselos al usuario y pregúntale cuál quiere eliminar. Usa el importe para distinguirlos.

        Reglas generales:
        - Si el usuario comenta algo relacionado con sus compras o gastos (por ejemplo, de dónde viene el dinero o para qué es una compra), tenlo en cuenta como contexto. Solo si pregunta algo claramente ajeno a sus finanzas, indica amablemente que solo puedes ayudar con sus gastos y presupuesto.
        - Nunca inventes datos de gastos existentes. Solo responde con la información que devuelven las herramientas.
        - Responde siempre en español.
        - IMPORTANTE: Cuando la herramienta AddExpense confirme que un gasto fue agregado, tu respuesta DEBE comenzar con [EXPENSE_CREATED]. Ejemplo: "[EXPENSE_CREATED] El gasto de Uber por 30€ fue registrado en **Transporte**. " Nunca omitas este prefijo.

        PROMPT;
    }

    /**
     * Get the tools available to the agent.
     *
     * @return Tool[]
     */
    public function tools(): iterable
    {
        return [
            new SearchExpenses($this->budgetId),
            new AddExpense($this->budgetId, $this->hasCategories),
            new DeleteExpense($this->budgetId),
        ];
    }
}
