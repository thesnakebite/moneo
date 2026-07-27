<x-layouts.auth :image="asset('images/auth/login-cover.jpg')">
    <x-slot:title>Iniciar sesión</x-slot:title>

    <form class="mt-14 space-y-5" novalidate>
        <div class="flex flex-col gap-2">
            <label class="font-bold text-sm sm:text-base" for="email">Email</label>

            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="email"
                tabindex="1"
            />
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
        </div>
        <input
            type="submit"
            value='Iniciar Sesión'
            class="bg-gray-900 hover:bg-gray-800 w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold cursor-pointer"
        />

        <div class="space-y-2">
            <div class="flex flex-col space-y-2 mt-8">
                <label class="text-sm sm:text-base" for="">¿Ya tienes cuenta?</label>
                <a
                    href="/registro"
                    class="text-center border boder-gray-800 hover:bg-gray-900 hover:text-white w-full p-3 rounded-lg text-sm sm:text-base font-bold cursor-pointer"
                >
                    Registrate
                </a>
            </div>
        </div>
    </form>
</x-layouts.auth>
