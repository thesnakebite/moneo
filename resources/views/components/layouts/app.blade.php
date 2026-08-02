<x-layouts.base>
    <div class="min-h-screen flex flex-col">
        <header class="border-b border-gray-200">
            <nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div class="flex lg:flex-1">
                    <a href="{{ route('dashboard') }}" class="-m-1.5 p-1.5">
                        <span class="sr-only">{{ config('app.name') }}</span>
                        <span class="font-semibold text-gray-900">{{ config('app.name') }}</span>
                    </a>
                </div>

                <div class="flex lg:flex-1 lg:justify-end">
                    <x-user-dropdown />
                </div>
            </nav>
        </header>

        <main class="flex-1 p-6">
            {{ $slot }}
        </main>
    </div>
</x-layouts.base>
