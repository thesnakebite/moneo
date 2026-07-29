<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

// Auth and Register
Route::get('/registro', [RegisterController::class, 'index'])->name('register');
Route::post('/registro', [RegisterController::class, 'store'])->name('register.store');
Route::get('/login', [LoginController::class, 'index'])->name('login');
// Email verification
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect()->route('dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
