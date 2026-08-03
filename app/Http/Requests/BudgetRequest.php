<?php

namespace App\Http\Requests;

use App\Enums\BudgetType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'decimal:0,2', 'min:0.01'],
            'type' => ['required', Rule::enum(BudgetType::class)],
            'starts_at' => ['nullable', 'date', 'required_with:ends_at'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at', 'required_with:starts_at'],
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
            'name.required' => 'El nombre del presupuesto es obligatorio.',
            'name.string' => 'El nombre debe ser un texto válido.',
            'name.max' => 'El nombre no puede superar los :max caracteres.',
            'amount.required' => 'La cantidad es obligatoria.',
            'amount.decimal' => 'La cantidad debe tener como máximo 2 decimales.',
            'amount.min' => 'La cantidad debe ser mayor a 0.',
            'type.required' => 'El tipo de presupuesto es obligatorio.',
            'type.enum' => 'El tipo de presupuesto no es válido.',
            'starts_at.date' => 'La fecha de inicio debe ser una fecha válida.',
            'starts_at.required_with' => 'Debes indicar la fecha de inicio si añades una fecha de fin.',
            'ends_at.date' => 'La fecha de fin debe ser una fecha válida.',
            'ends_at.after_or_equal' => 'La fecha de fin no puede ser anterior a la fecha de inicio.',
            'ends_at.required_with' => 'Debes indicar la fecha de fin si añades una fecha de inicio.',
        ];
    }
}
