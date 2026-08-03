<div class="flex flex-col gap-2">
    <label class="font-bold text-sm sm:text-base" for="name">Nombre</label>
    <input
        id="name"
        type="text"
        placeholder="Nombre del Presupuesto. Ej. Boda, Casa, Graduación, Semana"
        class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm"
        name="name"
        value="{{ old('name') }}"
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
        value="{{ old('amount') }}"
    />
    <x-input-error :messages="$errors->get('amount')" />
</div>

<div class="flex flex-col gap-2">
    <div class="flex gap-2 items-center">
        <label class="font-bold text-sm sm:text-base" for="type">Tipo de Presupuesto</label>
        <div class="relative inline-block group">
            <button type="button" class="size-5">
                <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path>
                </svg>
            </button>
            <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-gray-900 text-white px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 space-y-3"
            >
                <p>
                    <span class="font-bold">Presupuesto General</span> te permite almacenar gastos con categorías, ideal para presupuestos semanales o mensuales.
                </p>
                <p>
                    <span class="font-bold">Proyecto</span> te permite almacenar gastos relacionados como una graduación, boda o remodelación.
                </p>
            </div>
        </div>
    </div>


    <select id="type" name="type" class="w-full border border-gray-300 p-3 rounded-lg text-xs sm:text-sm">
        <option value="">Tipo de Presupuesto</option>
        <option value="general" @selected(old('type') === 'general')>General - Con Categorías</option>
        <option value="goal" @selected(old('type') === 'goal')>Proyecto</option>
    </select>
     <x-input-error :messages="$errors->get('type')" />
</div>
