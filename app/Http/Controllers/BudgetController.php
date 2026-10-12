<?php

namespace App\Http\Controllers;

use App\Enums\ExpenseCategory;
use App\Http\Requests\BudgetRequest;
use App\Models\Budget;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $active = Auth::user()
            ->budgets()
            ->active()
            ->withSum('expenses', 'amount')
            ->latest()
            ->get();

        $finished = Auth::user()
            ->budgets()
            ->finished()
            ->withSum('expenses', 'amount')
            ->latest('ends_at')
            ->get();

        $attention = $active->filter(function (Budget $budget) {
            $amount = (float) $budget->amount;

            return $amount > 0
                && round(((float) $budget->expenses_sum_amount / $amount) * 100) >= 90;
        })->count();

        $trashed = Auth::user()
            ->budgets()
            ->onlyTrashed()
            ->withSum('expenses', 'amount')
            ->latest('deleted_at')
            ->get();

        return Inertia::render('Dashboard', [
            'activeBudgets' => $active,
            'finishedBudgets' => $finished,
            'trashedBudgets' => $trashed,
            'summary' => [
                'managed' => (string) $active->sum('amount'),
                'spent' => (string) $active->sum(fn (Budget $budget) => (float) $budget->expenses_sum_amount),
                'attention' => $attention,
                'finished' => $finished->count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Budgets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BudgetRequest $request): RedirectResponse
    {
        Auth::user()->budgets()->create($request->validated());

        return redirect()
            ->route('dashboard')
            ->with('success', 'Presupuesto creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    #[Authorize('view', 'budget')]
    public function show(Budget $budget): Response
    {
        $budget->load([
            'expenses' => fn($query) => $query->latest()
        ]);

        $spent = (string) $budget->expenses->sum('amount');

        return Inertia::render('Budgets/Show', [
            'budget' => $budget,
            'spent' => $spent,
            'categories' => collect(ExpenseCategory::cases())->map(fn ($category) => [
                'value' => $category->value,
                'label' => $category->label(),
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Authorize('update', 'budget')]
    public function edit(Budget $budget): Response
    {
        return Inertia::render('Budgets/Edit', [
            'budget' => $budget
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Authorize('update', 'budget')]
    public function update(BudgetRequest $request, Budget $budget): RedirectResponse
    {
        $budget->update($request->validated());

        return redirect()
            ->route('dashboard')
            ->with('success', 'Presupuesto actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Authorize('delete', 'budget')]
    public function destroy(Budget $budget): RedirectResponse
    {
        $budget->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Presupuesto movido a la papelera.');
    }

    #[Authorize('restore', 'budget')]
    public function restore(Budget $budget): RedirectResponse
    {
        abort_unless($budget->trashed(), 404);

        $budget->restore();

        return redirect()->route('dashboard', ['tab' => 'trash'])
            ->with('success', 'Presupuesto restaurado.');
    }

    #[Authorize('forceDelete', 'budget')]
    public function forceDelete(Budget $budget): RedirectResponse
    {
        abort_unless($budget->trashed(), 404);

        $budget->forceDelete();

        return redirect()->route('dashboard', ['tab' => 'trash'])
            ->with('success', 'Presupuesto eliminado definitivamente.');
    }
}
