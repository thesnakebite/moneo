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
        ]);
    }
}
