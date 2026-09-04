<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Routing\Attributes\Controllers\Middleware;

#[Middleware('auth')]
#[Middleware('verified')]
#[Middleware('subscribed')]
class SubscriptionController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Subscriptions/Manage', [
            'plan' => auth()->user()->currentPlan(),
        ]);
    }
}
