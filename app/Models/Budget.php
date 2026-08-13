<?php

namespace App\Models;

use App\Enums\BudgetType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['user_id', 'name', 'amount', 'type', 'starts_at', 'ends_at'])]
class Budget extends Model
{
    use SoftDeletes, HasFactory;

    protected function casts(): array
    {
        return [
            'type' => BudgetType::class,
        ];
    }

    public function isGeneral(): bool
    {
        return $this->type === BudgetType::General;
    }

    public function isGoal(): bool
    {
        return $this->type === BudgetType::Goal;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
