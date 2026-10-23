<?php

namespace App\Http\Controllers;

use App\Ai\Agents\BudgetAssistant;
use App\Models\Budget;
use Illuminate\Http\Request;
use Laravel\Ai\Messages\AssistantMessage;
use Laravel\Ai\Messages\UserMessage;
use Illuminate\Routing\Attributes\Controllers\Middleware;

#[Middleware('auth')]
#[Middleware('verified')]
#[Middleware('subscribed')]
#[Middleware('throttle:ai-chat')]
class BudgetChatController extends Controller
{
    public function store(Request $request, Budget $budget)
    {
        $messages = collect($request->input('messages', []));

        $textOf = fn (array $message): string => collect(data_get($message, 'parts', []))
            ->where('type', 'text')
            ->pluck('text')
            ->implode(' ')
            ?: (string) data_get($message, 'content', '');

        $prompt = $textOf($messages->pop() ?? []);

        $agent = new BudgetAssistant;
        $agent->budgetId = $budget->id;
        $agent->hasCategories = $budget->isGeneral();
        $agent->history = $messages
            ->take(-20)
            ->filter(fn (array $message) => in_array(data_get($message, 'role'), ['user', 'assistant'], true))
            ->map(fn (array $message) => data_get($message, 'role') === 'user'
                ? new UserMessage($textOf($message))
                : new AssistantMessage($textOf($message)))
            ->filter(fn ($message) => $message->content !== '')
            ->values()
            ->all();

        if ($budget->isGoal()) {
            $agent->budgetContext = "Este presupuesto es de tipo Meta/Objetivo llamado '{$budget->name}' con un importe total de {$budget->amount}€. Los gastos NO tienen categorías, solo nombre e importe.";
        } else {
            $agent->budgetContext = "Este presupuesto es de tipo General llamado '{$budget->name}' con un importe total de {$budget->amount}€. Los gastos tienen nombre, importe y categoría.";
        }

        return $agent
            ->stream(
                $prompt,
                provider:'openai',
                model: 'gpt-4o-mini',
                // model: 'poolside/laguna-s-2.1:free',
                // model: 'google/gemma-4-26b-a4b-it:free',
                // model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
            )->usingVercelDataProtocol();
    }
}
