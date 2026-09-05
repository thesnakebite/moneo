<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
#[Middleware('subscribed')]
class SubscriptionController extends Controller
{
    public function show(): Response
    {
        $user = auth()->user();
        $subscription = $user->subscription('default');

        return Inertia::render('Subscriptions/Manage', [
            'plan' => $user->currentPlan(),
            'onGracePeriod' => $subscription?->onGracePeriod() ?? false,
            'endsAt' => $subscription->ends_at?->format('d/m/Y'),
            'price' => $subscription ? $this->getSubscriptionAmount($subscription) : null,
        ]);
    }

    private function getSubscriptionAmount($subscription): ?array
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
}
