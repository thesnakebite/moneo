<x-layouts.auth :image="asset('images/auth/login-cover.jpg')">
    <x-slot:title>Iniciar sesión</x-slot:title>

    <form
        method="POST"
        action="{{ route('login.store') }}"
        class="mt-14 space-y-5"
        novalidate
    >
        @csrf
        <div class="flex flex-col gap-2">
            <label class="font-bold text-sm sm:text-base" for="email">Email</label>

            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="email"
                tabindex="1"
                value="{{ old('email') }}"
            />
            <x-input-error :messages="$errors->get('email')" />
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
                <label class="font-bold text-sm sm:text-base">Password</label>
                <a href="#" class="text-indigo-950 text-xs" tabindex="3">¿Olvidaste tu Contraseña?</a>
            </div>
            <input
                type="password"
                placeholder="Password de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="password"
                tabindex="2"
            />
            <x-input-error :messages="$errors->get('password')" />
        </div>

        <div class="flex items-center gap-2">
            <input
                type="checkbox"
                class="appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                id="remember"
                name="remember"
                tabindex="4"
            />
            <label for="remember" class="text-sm">Recuérdame</label>
        </div>

        <input
            type="submit"
            value='Iniciar Sesión'
            class="bg-gray-900 hover:bg-gray-800 w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold cursor-pointer"
        />
    </form>

    <x-auth-switch-link
        question="¿No tienes cuenta?"
        label="Regístrate"
        route="register"
    />
</x-layouts.auth>
