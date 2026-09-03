<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
class BillingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Billing', [
            'monthlyPriceId' => config('services.stripe.price_ai_monthly'),
            'yearPriceId' => config('services.stripe.price_ai_yearly'),
        ]);
    }

    public function checkout(Request $request, string $plan)
    {
        $prices = [
            'monthly' => config('services.stripe.price_ai_monthly'),
            'yearly' => config('services.stripe.price_ai_yearly'),
        ];

        abort_unless(isset($prices[$plan]), 404, 'Plan no válido');

        $checkout = $request->user()
            ->newSubscription('default', $prices[$plan])
            ->allowPromotionCodes()
            ->checkout([
                'success_url' => route('billing.success'),
                'cancel_url' => route('billing.cancel'),
            ]);

        return Inertia::location($checkout->url);
    }

    public function success(): RedirectResponse
    {
        return redirect()
            ->route('dashboard')
            ->with('subscribed', true);
    }

    public function cancel(): RedirectResponse
    {
        return redirect()->route('billing');
    }
}
