<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Cashier::keepPastDueSubscriptionsActive();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('ai-chat', fn (Request $request) => [
            Limit::perMinute(6)
                ->by('ai-chat-minute:'.$request->user()->id)
                ->response(fn () => response()->json([
                    'message' => 'Vas muy rápido. Espera un momento antes de enviar otro mensaje.',
                ], 429)),
            Limit::perDay(50)
                ->by('ai-chat-day:'.$request->user()->id)
                ->response(fn () => response()->json([
                    'message' => 'Has alcanzado el límite diario de mensajes al asistente. Podrás seguir mañana.',
                ], 429)),
        ]);

        RateLimiter::for('ai-tickets', fn (Request $request) => [
            Limit::perDay(6)
                ->by('ai-tickets-day:'.$request->user()->id)
                ->response(fn () => response()->json([
                    'message' => 'Has alcanzado el límite diario de tickets escaneados. Podrás seguir mañana.',
                ], 429)),
        ]);
    }
}
