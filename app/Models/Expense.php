<?php

namespace App\Models;

use App\Enums\ExpenseCategory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['budget_id', 'name', 'amount', 'category'])]
class Expense extends Model
{
    use SoftDeletes, HasFactory, HasUuids;

    // Keep in sync with NAME_MAX_LENGTH in resources/js/utils/expense.ts
    public const NAME_MAX_LENGTH = 80;
    public const MAX_AMOUNT = 999999.99;

    protected $appends = ['category_label', 'category_color'];

    protected function categoryLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->category?->label(),
        );
    }

    protected function categoryColor(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->category?->color(),
        );
    }

    protected function casts(): array
    {
        return [
            'category' => ExpenseCategory::class,
        ];
    }

    public function budget(): BelongsTo
    {
        return $this->belongsTo(Budget::class);
    }
}
