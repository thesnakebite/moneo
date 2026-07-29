<x-layouts.auth :image="asset('images/auth/register-cover.jpg')">
    <x-slot:title>Registro</x-slot:title>

    <form
        method="POST"
        action="{{ route('register.store') }}"
        class="mt-14 space-y-5"
        novalidate
    >

        @csrf
        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="name">Nombre</label>

            <input
                id="name"
                type="text"
                placeholder="Tu Nombre"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="name"
                value="{{ old('name') }}"
            />
            <x-input-error :messages="$errors->get('name')" />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="email">Email</label>

            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="email"
                value="{{ old('email') }}"
            />
            <x-input-error :messages="$errors->get('email')" />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base">Password</label>

            <input
                type="password"
                placeholder="Password de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="password"
            />
            <x-input-error :messages="$errors->get('password')" />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="password_confirmation">Repetir Password</label>

            <input
                type="password"
                placeholder="Password de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="password_confirmation"
            />
        </div>

        <input
            type="submit"
            value='Crear una cuenta'
            class="bg-gray-900 hover:bg-gray-800 w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold cursor-pointer"
        />
    </form>

    <x-auth-switch-link
        question="¿Ya tienes cuenta?"
        label="Iniciar sesión"
        route="login"
    />
</x-layouts.auth>
