@props(['budgets'])

@if ($budgets->isNotEmpty())
    <div class="mt-8 flow-root max-w-5xl mx-auto">
        <div class="overflow-x-auto ring-1 ring-gray-300 rounded-lg">
            <div class="inline-block min-w-full align-middle">
                <table class="relative min-w-full">
                    <thead class="sr-only">
                        <tr>
                            <th scope="col" class="py-3"><span class="sr-only">Presupuestos</span></th>
                            <th scope="col" class="py-3"><span class="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300">
                        @foreach ($budgets as $budget)
                            <tr class="flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <td class="pt-8 pb-4 px-6 relative">
                                    <p class="absolute top-0 left-0 inline-block pl-3 pr-14 py-1 rounded-br-2xl text-xs font-semibold {{ $budget->type->color() }}">
                                        {{ $budget->type->label() }}
                                    </p>
                                    <a class="font-bold text-gray-900 block hover:underline" href="#">{{ $budget->name }}</a>
                                    <p class="text-sm text-gray-500 mt-0.5">{{ number_format($budget->amount, 2, ',', '.') }} €</p>
                                </td>
                                <td class="py-6 px-6 flex justify-end gap-3">
                                    <x-budget-dropdown />
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@else
    <p class="text-center mt-10">
        No hay presupuestos.
        <a href="{{ route('budgets.create') }}" class="text-amber-500">Comienza creando uno</a>
    </p>
@endif
