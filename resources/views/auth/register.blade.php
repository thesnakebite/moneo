<x-layouts.auth :image="asset('images/auth/register-cover.jpg')">
    <x-slot:title>Registro</x-slot:title>

    <form class="mt-14 space-y-5" novalidate>
        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="name">Nombre</label>

            <input
                id="name"
                type="text"
                placeholder="Tu Nombre"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="name"
            />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base" for="email">Email</label>

            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="email"
            />
        </div>

        <div class="space-y-2">
            <label class="font-bold block text-sm sm:text-base">Password</label>

            <input
                type="password"
                placeholder="Password de Registro"
                class="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base"
                name="password"
            />
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

        <div class="space-y-2">
            <div class="flex flex-col space-y-4 mt-8">
                <label class="text-sm sm:text-base" for="">¿Ya tienes cuenta?</label>
                <a
                    href="/login"
                    class="text-center border boder-gray-800 hover:bg-gray-900 hover:text-white w-full p-3 rounded-lg text-sm sm:text-base font-bold cursor-pointer"
                >
                    Iniciar Sesión
                </a>
            </div>
        </div>
    </form>
</x-layouts.auth>
