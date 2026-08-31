<?php

namespace App\Http\Controllers;

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
}
