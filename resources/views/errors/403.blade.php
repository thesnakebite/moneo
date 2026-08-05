<x-layouts.base>
    <x-slot:title>Acceso no autorizado</x-slot:title>

    <div class="min-h-screen flex items-center justify-center px-6">
        <div class="text-center max-w-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" class="size-24 mx-auto text-amber-200">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <p class="mt-4 text-sm font-bold text-amber-400">Error 403</p>
            <h1 class="mt-2 text-2xl sm:text-4xl font-bold text-gray-900">No tienes permiso para ver esto</h1>
            <p class="mt-3 text-base text-gray-500 max-w-sm mx-auto">
                {{ $exception->getMessage() ?: 'No tienes autorización para acceder a este recurso.' }}
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="{{ route('dashboard') }}" class="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-bold">
                    Volver al dashboard
                </a>
                <a href="mailto:soporte@moneo.app" class="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg text-sm font-bold text-gray-700">
                    Contactar soporte
                </a>
            </div>
        </div>
    </div>
</x-layouts.base>
