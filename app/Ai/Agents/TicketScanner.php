<?php

namespace App\Ai\Agents;

use App\Enums\ExpenseCategory;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Stringable;

class TicketScanner implements Agent, HasStructuredOutput
{
    use Promptable;

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        return <<<'PROMPT'
        Eres un asistente que lee tickets de venta a partir de una imagen y extrae la información estructurada.

        Reglas:
        - Devuelve el nombre del negocio en "store".
        - La categoría debe ser EXACTAMENTE una de: food, transport, health, housing, leisure, shopping, other.
        - "items" debe contener cada producto con su nombre y precio numérico (sin símbolos de moneda).
        - No inventes productos que no estén claramente visibles en el ticket.
        PROMPT;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'store' => $schema->string(),
            'category' =>$schema->string()->enum(ExpenseCategory::cases())->required(),
            'items' => $schema->array()
                ->items(
                    $schema->object(fn ($schema) => [
                        'name' => $schema->string()->required(),
                        'amount' => $schema->number()->required(),
                    ])
                )->required()
        ];
    }
}
