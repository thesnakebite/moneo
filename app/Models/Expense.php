<?php

namespace App\Models;

use App\Enums\ExpenseCategory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected function casts(): array
    {
        return [
            'category' => ExpenseCategory::class,
        ];
    }
}
