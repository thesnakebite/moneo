<x-layouts.app>
    <x-slot:title>Administra tus presupuestos</x-slot:title>

    <x-page-header
        title="Administra tus presupuestos"
        description="Gestiona tus presupuestos, gastos e ingresos"
    >
        <x-slot:actions>
            <a href="{{ route('budgets.create') }}" class="bg-accent hover:bg-accent-dark text-white px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors">
                + Nuevo presupuesto
            </a>
        </x-slot:actions>
    </x-page-header>

    {{-- Tabla de presupuestos --}}
    <x-budget-table :budgets="$budgets" />

</x-layouts.app>
