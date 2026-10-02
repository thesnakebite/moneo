<?php

namespace App\Enums;

enum ExpenseCategory: string
{
    case Food = 'food';
    case Transport = 'transport';
    case Housing = 'housing';
    case Decor = 'decor';
    case Utilities = 'utilities';
    case Shopping = 'shopping';
    case Hardware = 'hardware';
    case Leisure = 'leisure';
    case Subscriptions = 'subscriptions';
    case Education = 'education';
    case Health = 'health';
    case Pets = 'pets';
    case Gifts = 'gifts';
    case Repairs = 'repairs';
    case FitnessCare = 'fitness_care';
    case Donations = 'donations';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Food => 'Comida',
            self::Transport => 'Transporte',
            self::Housing => 'Vivienda',
            self::Decor => 'Decoración',
            self::Utilities => 'Suministros',
            self::Shopping => 'Compras',
            self::Hardware => 'Hardware',
            self::Leisure => 'Ocio',
            self::Subscriptions => 'Suscripciones',
            self::Education => 'Educación',
            self::Health => 'Salud',
            self::Pets => 'Mascotas',
            self::Gifts => 'Regalos',
            self::Repairs => 'Reparaciones',
            self::FitnessCare => 'Fitness y cuidado personal',
            self::Donations => 'Donaciones',
            self::Other => 'Otros',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Food => 'bg-orange-100 text-orange-700',
            self::Transport => 'bg-blue-100 text-blue-700',
            self::Housing => 'bg-purple-100 text-purple-700',
            self::Decor => 'bg-rose-100 text-rose-700',
            self::Utilities => 'bg-cyan-100 text-cyan-700',
            self::Shopping => 'bg-amber-100 text-amber-700',
            self::Hardware => 'bg-indigo-100 text-indigo-700',
            self::Leisure => 'bg-pink-100 text-pink-700',
            self::Subscriptions => 'bg-lime-100 text-lime-700',
            self::Education => 'bg-emerald-100 text-emerald-700',
            self::Health => 'bg-red-100 text-red-700',
            self::Pets => 'bg-yellow-100 text-yellow-700',
            self::Gifts => 'bg-fuchsia-100 text-fuchsia-700',
            self::Repairs => 'bg-slate-100 text-slate-700',
            self::FitnessCare => 'bg-teal-100 text-teal-700',
            self::Donations => 'bg-violet-100 text-violet-700',
            self::Other => 'bg-gray-100 text-gray-700',
        };
    }
}
