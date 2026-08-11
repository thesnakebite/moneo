<?php

namespace App\Enums;

enum ExpenseCategory: string
{
    case Food = 'food';
    case Transport = 'transport';
    case Housing = 'housing';
    case Leisure = 'leisure';
    case Health = 'health';
    case Shopping = 'shopping';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self:: Food => 'Comida',
            self::Transport => 'Transporte',
            self::Housing => 'Vivienda',
            self::Leisure => 'Ocio',
            self::Health => 'Salud',
            self::Shopping => 'Compras',
            self::Other => 'Otros',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Food => 'bg-orange-100 text-orange-700',
            self::Transport => 'bg-blue-100 text-blue-700',
            self::Housing => 'bg-purple-100 text-purple-700',
            self::Leisure => 'bg-pink-100 text-pink-700',
            self::Health => 'bg-red-100 text-red-700',
            self::Shopping => 'bg-amber-100 text-amber-700',
            self::Other => 'bg-gray-100 text-gray-700',
        };
    }
}
