<?php

namespace App\Http\Controllers;

use App\Ai\Agents\TicketScanner;
use App\Enums\ExpenseCategory;
use App\Models\Budget;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Laravel\Ai\Files\Image;

#[Middleware('auth')]
#[Middleware('verified')]
class TicketScanController extends Controller
{
    #[Authorize('update', 'budget')]
    public function store(Request $request, Budget $budget): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:1240'],
        ]);

        /**@var \Laravel\Ai\Responses\StructuredAgentResponse $response */
        $response = (new TicketScanner)->prompt(
            'Lee este ticket de venta y extrae la información',
            attachments: [Image::fromUpload($request->file('image'))],
            provider: 'openrouter',
            model: 'nvidia/nemotron-nano-12b-v2-vl:free',
            // model: 'nvidia/nemotron-nano-12b-v2-vl:free',
            timeout: 120,
        );

        if (empty($response['items'])) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudieron extraer los productos del ticket 🧾'
            ]);
        }

        return response()->json(
            $this->createExpenses($budget, $response['store'], $response['category'], $response['items'])
        );
    }

    private function createExpenses(Budget $budget, string $store, string $category, array $items): array
    {
        $created = [];
        $categoryEnum = ExpenseCategory::tryFrom($category);

        foreach ($items as $item) {
            $expense = Expense::create([
                'budget_id' => $budget->id,
                'name' => $store . ' - ' . $item['name'],
                'amount' => $item['amount'],
                'category' => $budget->isGeneral() && $categoryEnum ? $categoryEnum->value : null,
            ]);

            $cat = $expense->category ? $expense->category->label() : 'Sin categoría';
            $created[] = "- {$expense->name}: {$expense->amount}€ ({$cat})";
        }

        $total = array_sum(array_column($items, 'amount'));

        return [
            'success' => true,
            'message' => "Se registraron " . count($created) . " gastos del ticket:\n" .
                implode("\n", $created) .
                "\nTotal: {$total}€",
        ];
    }

}
