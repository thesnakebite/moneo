@props([
    'image' => null,
])

<x-layouts.base>
    <x-slot:title>{{ $title ?? null }}</x-slot:title>

    <div class="min-h-screen flex">
        {{-- Left column --}}
        <div
            class="hidden lg:flex lg:w-1/2 relative h-screen bg-cover bg-center bg-(image:--auth-image)"
            @if($image) style="--auth-image: url('{{ $image }}')" @endif
        >
            {{-- Overlay optionl logo/text --}}
            <div class="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

            <div class="relative z-10 flex flex-col justify-end p-10 text-white">
                <span class="text-7xl font-unique text-accent">{{ config('app.name') }}</span>
                <p class="mt-2 text-sm text-surface">Gestiona tus gastos e ingresos en un único lugar.</p>
            </div>
        </div>

        {{-- Right column --}}
        <div class="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">
            <div class="w-full max-w-md">
                {{ $slot }}
            </div>
        </div>
    </div>
</x-layouts.base>
