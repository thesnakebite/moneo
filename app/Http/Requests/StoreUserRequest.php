<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:2', 'max:14'],
            'email' => ['required', 'email:rfc, dns', 'unique:users,email'],
            'password' => ['required', 'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->symbols()
                    ->numbers()
                    ->uncompromised()
            ]
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.min' => 'El nombre debe contener un mínimo de :min caracteres.',
            'name.max' => 'El nombre debe contener un máximo de :max caracteres.',
            'email.required' => 'El email es obligatorio.',
            'email.rfc' => 'El email debe ser válido.',
            'email.unique' => 'Este email ya esta registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'La contraseña debe tener mínimo :min caracteres.',
            'password.mixed' => 'La contraseña debe contener al menos una letra minúscula y otra mayúscula.',
            'password.symbols' => 'La contraseña debe contener al menos un simbolo especial (^*!?@.-).',
            'password.numbers' => 'La contraseña debe contener al menos un número.',
            'password.uncompromised' => 'La contraseña ha aparecido en filtraciones de datos. Elige una más segura.',
        ];
    }
}
