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
                class="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-transparent outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                name="email"
                tabindex="1"
                value="{{ old('email') }}"
            />
            <x-input-error :messages="$errors->get('email')" />
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
                <label class="font-bold text-sm sm:text-base" for="password">Password</label>
                <a href="#" class="text-accent-dark text-xs font-semibold" tabindex="3">¿Olvidaste tu Contraseña?</a>
            </div>
            <input
                id="password"
                type="password"
                placeholder="Password de Registro"
                class="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-transparent outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                name="password"
                tabindex="2"
            />
            <x-input-error :messages="$errors->get('password')" />
        </div>

        <div class="flex items-center gap-2">
            <input
                type="checkbox"
                class="appearance-none w-4 h-4 border border-border-soft rounded checked:bg-accent focus:outline-none focus:ring-1 focus:ring-muted focus:ring-offset-1 bg-transparent"
                id="remember"
                name="remember"
                tabindex="4"
            />
            <label for="remember" class="text-sm">Recuérdame</label>
        </div>

        <input
            type="submit"
            value='Iniciar Sesión'
            class="bg-accent hover:bg-accent-dark w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold cursor-pointer"
        />
    </form>

    <x-auth-switch-link
        question="¿No tienes cuenta?"
        label="Regístrate"
        route="register"
    />
</x-layouts.auth>
