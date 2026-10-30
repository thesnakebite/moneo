<?php

namespace App\Models;

use App\Enums\BudgetType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['user_id', 'name', 'amount', 'type', 'starts_at', 'ends_at'])]
#[Hidden(['user_id'])]
class Budget extends Model
{
    use SoftDeletes, HasFactory, Prunable, HasUuids;

    // Keep in sync with TRASH_RETENTION_DAYS, NAME_MAX_LENGTH in resources/js/utils/budget.ts
    public const TRASH_RETENTION_DAYS = 30;
    public const NAME_MAX_LENGTH = 60;
    public const MAX_AMOUNT = 999999.99;

    public function prunable(): Builder
    {
        return static::onlyTrashed()
            ->where('deleted_at', '<=', now()->subDays(self::TRASH_RETENTION_DAYS));
    }

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

    #[Scope]
    protected function active(Builder $query): void
    {
        $query->where(fn (Builder $query) => $query
            ->whereNull('ends_at')
            ->orWhere('ends_at', '>=', today())
        );
    }

    #[Scope]
    protected function finished(Builder $query): void
    {
        $query->whereNotNull('ends_at')
            ->where('ends_at', '<', today());
    }
}
