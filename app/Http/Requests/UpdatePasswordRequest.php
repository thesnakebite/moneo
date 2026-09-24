<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;


class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->mixedCase()->symbols()->numbers()->uncompromised()],
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.required' => 'Debes introducir tu contraseña actual.',
            'current_password.current_password' => 'La contraseña actual no es correcta.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'La contraseña debe tener mínimo :min caracteres.',
            'password.letters' => 'La contraseña debe contener al menos una letra.',
            'password.mixed' => 'La contraseña debe contener al menos una letra minúscula y otra mayúscula.',
            'password.symbols' => 'La contraseña debe contener al menos un simbolo especial (^*!?@.-).',
            'password.numbers' => 'La contraseña debe contener al menos un número.',
            'password.uncompromised' => 'La contraseña ha aparecido en filtraciones de datos. Elige una más segura.',
        ];
    }
}
