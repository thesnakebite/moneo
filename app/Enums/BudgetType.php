<?php

namespace App\Enums;

enum BudgetType: string
{
    case General = 'general';
    case Goal = 'goal';

    public function label(): string
    {
        return match ($this) {
            self::General => 'General',
            self::Goal => 'Proyecto',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::General => 'bg-gray-200 text-gray-600',
            self::Goal => 'bg-amber-200 text-amber-600',
        };
    }
}
