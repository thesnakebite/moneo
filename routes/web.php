<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\LogoutController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth and Register
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.store');
Route::post('/logout', [LogoutController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
// Email verification
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect()->route('dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::post('/email/verification-notification', function (Request $request) {
    if ($request->user()->hasVerifiedEmail()) {
        return redirect()->route('dashboard');
    }
    $request->user()->sendEmailVerificationNotification();
    return back()->with('success', 'Se ha reenviado el correo de verificación.');
})->middleware(['auth', 'throttle:6,1'])->name('verification-send');

Route::get('/dashboard', [BudgetController::class, 'index'] )->name('dashboard');

Route::prefix('budgets')->name('budgets.')->group(function () {
    Route::get('/create', [BudgetController::class, 'create'])->name('create');
    Route::post('/store', [BudgetController::class, 'store'])->name('store');
    Route::get('/{budget}/edit', [BudgetController::class, 'edit'])->name('edit');
    Route::put('/{budget}', [BudgetController::class, 'update'])->name('update');
});
