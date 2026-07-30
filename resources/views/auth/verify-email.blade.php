<x-layouts.auth :image="asset('images/auth/verify-email.jpg')">
    <x-slot:title>Confirma tu cuenta</x-slot:title>

    <div class="space-y-6">
        <div>
            <p class="text-lg font-bold">Tu cuenta fue creada con éxito</p>
            <p class="mt-2 text-sm text-gray-600">
                Ahora solo debes confirmar tu cuenta. Hemos enviado un enlace de verificación a tu correo.
            </p>
        </div>

        @if (session('success'))
            <p class="px-2 py-2 border-l-8 bg-green-100 text-center text-sm text-green-700">
                {{ session('success') }}
            </p>
        @endif

        <form method="POST" action="{{ route('verification-send') }}">
            @csrf
            <button
                type="submit"
                class="w-full p-3 rounded-lg text-sm font-bold bg-gray-900 hover:bg-gray-800 text-white"
            >
                Reenviar email de verificación
            </button>
        </form>

        <a href="{{ route('login') }}" class="block text-center text-sm font-bold border border-gray-800 hover:bg-gray-900 hover:text-white w-full p-3 rounded-lg">
            Volver a inicio de sesión
        </a>
    </div>
</x-layouts.auth>
