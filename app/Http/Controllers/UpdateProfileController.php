<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
class UpdateProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Profile/UpdateProfile', [
            'profile' => auth()->user()->only('name', 'email')
        ]);
    }
}
