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
                class="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-transparent outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
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
                class="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-transparent outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                name="email"
                value="{{ old('email') }}"
            />
            <x-input-error :messages="$errors->get('email')" />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="password">Password</label>

            <input
                id="password"
                type="password"
                placeholder="Password de Registro"
                class="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-transparent outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                name="password"
            />
            <x-input-error :messages="$errors->get('password')" />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="password_confirmation">Repetir Password</label>

            <input
                id="password_confirmation"
                type="password"
                placeholder="Repite tu contraseña"
                class="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-transparent outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                name="password_confirmation"
            />
        </div>

        <input
            type="submit"
            value="Crear una cuenta"
            class="bg-accent hover:bg-accent-dark w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold cursor-pointer"
        />
    </form>

    <x-auth-switch-link
        question="¿Ya tienes cuenta?"
        label="Iniciar sesión"
        route="login"
    />
</x-layouts.auth>
