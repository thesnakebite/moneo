@props(['title', 'description'])

<div class="flex items-start max-w-5xl mx-auto justify-between flex-wrap gap-4 mb-6">
    <div>
        <div class="flex items-center gap-3">
            <h1 class="text-base sm:text-2xl font-bold">{{ $title }}</h1>

            @isset($badge)
                {{ $badge }}
            @endisset
        </div>

        <p class="mt-1 text-sm text-gray-500">{{ $description }}</p>
    </div>

    <div>
        {{ $actions }}
    </div>
</div>
