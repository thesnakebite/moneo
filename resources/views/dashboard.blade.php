<x-layouts.base>
    <x-slot:title>Administra tus Presupuestos</x-slot:title>

    <div class="space-y-6 mt-48 bg-zinc-100 border border-zinc-400 rounded p-6 m-6">
        <div class="flex flex-col items-center justify-center">
            <p>Hola <span class="font-bold text-gray-400">{{ auth()->user()->name }}</span></p>
            <p class="text-lg font-bold">Administra tus presupuestos</p>
            <p class="mt-2 text-sm text-gray-600">
                Gestiona tus presupuestos
            </p>
        </div>
    </div>
</x-layouts.base>
