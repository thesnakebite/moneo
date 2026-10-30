<?php

namespace App\Http\Requests;

use App\Enums\ExpenseCategory;
use App\Models\Expense;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class ExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $budget = $this->route('budget');

        return $budget && $this->user()->can('update', $budget);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $budget = $this->route('budget');

        return [
            'name' => ['required', 'string', 'max:' . Expense::NAME_MAX_LENGTH],
            'amount' => ['required', 'decimal:0,2', 'min:0.01', 'max:' . Expense::MAX_AMOUNT],
            'category' => Rule::when(
                $budget->isGeneral(),
                ['required', new Enum(ExpenseCategory::class)],
                ['nullable'],
            ),
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del gasto es obligatorio.',
            'name.string' => 'El nombre debe ser un texto válido.',
            'name.max' => 'El nombre no puede superar los :max caracteres.',
            'amount.required' => 'La cantidad es obligatoria.',
            'amount.decimal' => 'La cantidad debe tener como máximo 2 decimales.',
            'amount.min' => 'La cantidad debe ser mayor a 0.',
            'amount.max' => 'La cantidad no puede superar 999.999,99 €.',
            'category.required' => 'La categoría es obligatoria para presupuestos generales.',
            'category.enum' => 'La categoría seleccionada no es válida.',
        ];
    }
}
