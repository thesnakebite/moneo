<div class="flex flex-col gap-2">
    <label class="font-bold text-sm sm:text-base" for="name">Nombre</label>
    <input
        id="name"
        type="text"
        placeholder="Nombre del Presupuesto. Ej. Boda, Casa, Graduación, Semana"
        class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm"
        name="name"
        value="{{ old('name', $budget?->name) }}"
    />
    <x-input-error :messages="$errors->get('name')" />
</div>

<div class="flex flex-col gap-2">
    <label class="font-bold text-sm sm:text-base" for="amount">Cantidad</label>

    <input
        id="amount"
        type="number"
        min="0"
        step="1"
        placeholder="Cantidad de Presupuesto"
        class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm"
        name="amount"
        value="{{ old('amount', $budget?->amount) }}"
    />
    <x-input-error :messages="$errors->get('amount')" />
</div>

<div class="flex flex-col gap-2">
    @if (!$budget)
        <div class="flex gap-2 items-center">
            <label class="font-bold text-sm sm:text-base" for="type">Tipo de Presupuesto</label>

            <details class="relative inline-block">
                <summary class="list-none size-5 cursor-pointer text-gray-400 hover:text-gray-600">
                    <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path>
                    </svg>
                </summary>

                <div class="absolute z-10 bottom-full right-0 mb-2 w-52 rounded-lg bg-gray-900 text-white px-3 py-2 space-y-2 text-xs">
                    <p><span class="font-bold underline">General</span> te permite gastos con categorías, ideal para presupuestos semanales o mensuales.</p>
                    <p><span class="font-bold underline">Proyecto</span> agrupa gastos relacionados: una boda, graduación o remodelación.</p>
                </div>
            </details>
        </div>

        <select id="type" name="type" class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm">
            <option value="">Tipo de Presupuesto</option>
            <option value="general" @selected(old('type') === 'general')>General - Con Categorías</option>
            <option value="goal" @selected(old('type') === 'goal')>Proyecto</option>
        </select>
        <x-input-error :messages="$errors->get('type')" />
    @endif

    <div class="flex justify-between gap-2 mb-2">
        <div>
            <label class="font-bold text-sm sm:text-base" for="starts_at">Fecha de inicio <span class="text-amber-500 text-xs">(opcional)</span></label>
            <input
                id="starts_at"
                type="date"
                class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm"
                name="starts_at"
                value="{{ old('starts_at', $budget?->starts_at) }}"
            />
            <x-input-error :messages="$errors->get('starts_at')" />
        </div>
        <div>
            <label class="font-bold text-sm sm:text-base" for="ends_at">Fecha de fin <span class="text-amber-500 text-xs">(opcional)</span></label>
            <input
                id="ends_at"
                type="date"
                class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm"
                name="ends_at"
                value="{{ old('ends_at', $budget?->ends_at) }}"
            />
            <x-input-error :messages="$errors->get('ends_at')" />
        </div>
    </div>
</div>
