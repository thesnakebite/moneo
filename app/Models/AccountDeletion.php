<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['email', 'reason', 'deleted_at'])]
class AccountDeletion extends Model
{
    public $timestamps = false;

    protected $casts = [
        'deleted_at' => 'datetime',
    ];
}
