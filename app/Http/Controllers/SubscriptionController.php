<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Subscription;

#[Middleware('auth')]
#[Middleware('verified')]
#[Middleware('subscribed')]
class SubscriptionController extends Controller
{
    public function show(): Response
    {
        $user = auth()->user();
        $subscription = $user->subscription('default');

        $nextBillingDate = $subscription ? $this->getNextBillingDate($subscription) :null;

        return Inertia::render('Subscriptions/Manage', [
            'plan' => $user->currentPlan(),
            'onGracePeriod' => $subscription?->onGracePeriod() ?? false,
            'endsAt' => $subscription->ends_at?->format('d.m.Y'),
            'price' => $subscription ? $this->getSubscriptionAmount($subscription) : null,
            'status_label' => $subscription ? $this->buildStatusLabel($subscription, $nextBillingDate) : null,
            'currentPeriodEnd' => $nextBillingDate,
        ]);
    }

    public function previewSwap(Request $request, string $plan)
    {
        $prices = [
            'monthly' => config('services.stripe.price_ai_monthly'),
            'yearly' => config('services.stripe.price_ai_yearly'),
        ];

        abort_unless(isset($prices[$plan]), 404);

        $user = $request->user();
        $subscription = $user->subscription('default');

        try {
            $invoice = $subscription->previewInvoice($prices[$plan]);
            $newPlanLine = collect($invoice->lines->data)->first(fn ($line) => $line->amount > 0);

            return response()->json([
                'amount_due' => $invoice->amount_due / 100,
                'next_payment_amount' => $newPlanLine ? $newPlanLine->amount / 100 : null,
                'next_payment_date' => $newPlanLine ? \Carbon\Carbon::createFromTimestamp($newPlanLine->period->end)->format('d.m.Y') : null,
            ]);
        } catch (\Exception $e) {
            logger()->error('Error obteniendo preview del swap', ['error' => $e->getMessage()]);

            return response()->json(['error' => 'No se pudo calcular el importe.'], 500);
        }
    }

    public function swap(Request $request, string $plan)
    {
        $prices = [
            'monthly' => config('services.stripe.price_ai_monthly'),
            'yearly' => config('services.stripe.price_ai_yearly'),
        ];

        abort_unless(isset($prices[$plan]), 404);

        $user = $request->user();
        $subscription = $user->subscription('default');
        $currentPlan = $user->currentPlan();

        if ($currentPlan === 'yearly' && $plan === 'monthly') {
            return back()->with('error', 'No puedes cambiar de plan anual a mensual. Si quieres hacerlo, cancela tu suscripción actual y podrás elegir el plan mensual cuando finalice tu periodo de acceso.');
        }

        if ($currentPlan === $plan) {
            return back()->with('error', 'Ya tienes activo este plan.');
        }

        $subscription->swap($prices[$plan]);

        cache()->forget("stripe.next_billing.{$subscription->id}");

        $planLabel = $plan === 'yearly' ? 'anual' : 'mensual';
        $extra = $plan === 'yearly' ? ' Disfruta de tu ahorro.' : '.';

        return redirect()
            ->route('subscription.manage')
            ->with('success', "Tu plan se ha actualizado correctamente a {$planLabel}.{$extra}");
    }

    public function cancel(Request $request): RedirectResponse
    {
        $request->user()->subscription('default')->cancel();

        return redirect()->route('subscription.manage')
            ->with('success', 'Tu suscripción se cancelará al finalizar el periodo actual.');
    }

    public function resume(Request $request): RedirectResponse
    {
        $request->user()->subscription('default')->resume();

        return redirect()->route('subscription.manage')
            ->with('success', 'Tu suscripción ha sido reactivada correctamente.');
    }

    private function getNextBillingDate(Subscription $subscription): ?string
    {
        return cache()->remember(
            "stripe.next_billing.{$subscription->id}",
            now()->addHours(1),
            function () use ($subscription) {
                try {
                    $stripe = $subscription->asStripeSubscription();

                    $periodEnd = $stripe->items->data[0]->current_period_end ?? null;

                    return $periodEnd
                        ? Carbon::createFromTimestamp($periodEnd)->format('d.m.Y')
                        : null;
                } catch (\Exception $e) {
                    logger()->error('Error obteniendo next billing date', [
                        'error' => $e->getMessage(),
                        'subscription_id' => $subscription->id,
                    ]);
                    return null;
                }
            }
        );
    }

    private function getSubscriptionAmount(Subscription $subscription): ?array
    {
        try {
            $stripe = $subscription->asStripeSubscription();
            $price = $stripe->items->data[0]->price ?? null;

            if (! $price) {
                return null;
            }

            return [
                'amount' => $price->unit_amount / 100,
                'currency' => strtoupper($price->currency),
            ];
        } catch (\Exception $e) {
            logger()->error('Error obteniendo el importe de la suscripción', [
                'error' => $e->getMessage(),
                'subscription_id' => $subscription->id,
            ]);

            return null;
        }
    }

    private function buildStatusLabel(Subscription $subscription, ?string $nextBillingDate): array
    {
        if ($subscription->ended()) {
            return [
                'text' => 'Suscripción terminada',
                'description' => 'Terminó el',
                'date' => $subscription->ends_at?->format('d.m.Y'),
                'color' => 'gray',
            ];
        }

        if ($subscription->onGracePeriod()) {
            return [
                'text' => 'Cancelada',
                'description' => 'Acceso hasta',
                'date' => $subscription->ends_at?->format('d.m.Y'),
                'color' => 'orange',
            ];
        }

        if ($subscription->hasIncompletePayment() || $subscription->pastDue()) {
            if ($this->latestInvoiceIsPaid($subscription)) {
                return [
                    'text' => 'Suscripción activa',
                    'description' => 'Tu próximo cobro será el',
                    'color' => 'green',
                    'date' => $nextBillingDate,
                ];
            }

            if ($subscription->hasIncompletePayment()) {
                return [
                    'text' => 'Pago por confirmar',
                    'description' => 'Completa la verificación de tu tarjeta',
                    'date' => null,
                    'color' => 'red',
                ];
            }

            return [
                'text' => 'Pago pendiente',
                'description' => 'Actualiza tu método de pago para continuar',
                'date' => null,
                'color' => 'red',
            ];
        }

        return [
            'text' => 'Suscripción activa',
            'description' => 'Tu próximo cobro será el',
            'color' => 'green',
            'date' => $nextBillingDate,
        ];
    }

    private function latestInvoiceIsPaid(Subscription $subscription): bool
    {
        $invoice = $subscription->latestInvoice();

        return $invoice && $invoice->paid;
    }
}
