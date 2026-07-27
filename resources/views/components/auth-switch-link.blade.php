@props([
    'question',
    'route',
    'label',
])

<div class="space-y-2">
    <div class="flex flex-col space-y-2 mt-8">
        <label class="text-xs">{{ $question }}</label>
        <a
            href="{{ route($route) }}"
            class="text-center border border-gray-800 hover:bg-gray-900 hover:text-white w-full p-3 rounded-lg text-sm sm:text-base font-bold cursor-pointer"
        >
            {{ $label }}
        </a>
    </div>
</div>
