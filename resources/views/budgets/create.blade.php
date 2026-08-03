<x-layouts.app>
    <x-slot:title>Crear presupuesto</x-slot:title>

    <x-page-header
        title="Crear presupuesto"
        description="Crear un presupuesto es sencillo: añade un nombre y cantidad."
    >
        <x-slot:actions>
            <a href="{{ route('dashboard') }}" class="block bg-amber-500 text-white w-full px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold cursor-pointer">
                Volver a presupuestos
            </a>
        </x-slot:actions>
    </x-page-header>

    <form
        method="POST"
        action="{{ route('budgets.store') }}"
        class="mt-14 space-y-3 max-w-2xl mx-auto"
        novalidate
    >
        @csrf
        <x-budget-form />

        <input
            type="submit"
            value="Crear presupuesto"
            class="bg-gray-950 hover:bg-gray-800 text-white px-2 w-full sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold cursor-pointer"
        />
    </form>
</x-layouts.app>
