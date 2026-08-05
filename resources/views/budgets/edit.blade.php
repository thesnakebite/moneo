<x-layouts.app>
    <x-slot:title>Editar presupuesto: {{ $budget->name }}</x-slot:title>

    <x-page-header
        title="Editar presupuesto"
        description="{{ $budget->name }} · creado el {{ $budget->created_at->translatedFormat('d M Y') }}"
    >
        <x-slot:badge>
            <span class="bg-gray-900 text-white text-xs px-3 py-1 rounded-lg font-semibold">
                {{ $budget->type->label() }}
            </span>
        </x-slot:badge>

        <x-slot:actions>
            <a href="{{ route('dashboard') }}" class="block bg-amber-500 text-white w-full px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold cursor-pointer">
                Volver a presupuestos
            </a>
        </x-slot:actions>
    </x-page-header>

    <form
        method="POST"
        action="{{ route('budgets.update', $budget) }}"
        class="mt-14 space-y-3 max-w-2xl mx-auto"
        novalidate
    >
        @csrf
        @method('PUT')
        
        <x-budget-form :budget="$budget" />

        <div class="flex items-center justify-between gap-3 pt-3">
            <button
                type="submit"
                form="delete-budget-form"
                class="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold"
            >
                Eliminar presupuesto
            </button>

            <input
                type="submit"
                value="Guardar cambios"
                class="bg-gray-950 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold cursor-pointer"
            />
        </div>
    </form>

    <form
        id="delete-budget-form"
        method="POST"
        action=""
        onsubmit="return confirm('¿Seguro que quieres eliminar este presupuesto? Esta acción no se puede deshacer.')"
        class="hidden"
    >
    </form>
</x-layouts.app>
