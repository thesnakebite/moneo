<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <meta property="og:type" content="website">
        <meta property="og:title" content="Moneo">
        <meta property="og:description" content="Controla tus presupuestos y gastos con un asistente de IA a tu lado.">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:image" content="{{ asset('images/moneo-share.jpg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta name="twitter:card" content="summary_large_image">

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Moneo" />
        <link rel="manifest" href="/site.webmanifest" />

        @fonts
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        <x-inertia::head />
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>
