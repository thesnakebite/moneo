<x-layouts.base>
    <x-slot:title>Página no encontrada</x-slot:title>

    <div class="min-h-screen flex items-center justify-center px-6">
        <div class="text-center max-w-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" class="size-24 mx-auto text-gray-200">
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v3m0 0v3m0-3h3m-3 0h-3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <p class="mt-4 text-sm font-bold text-gray-400">Error 404</p>
            <h1 class="mt-2 text-2xl sm:text-4xl font-bold text-gray-900">No hemos encontrado esta página</h1>
            <p class="mt-3 text-base text-gray-500 max-w-sm mx-auto">
                Puede que el enlace esté roto o que la página se haya movido a otra dirección.
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
