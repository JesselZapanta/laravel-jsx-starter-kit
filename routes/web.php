<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\UserDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

//Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

//Admin Role
Route::middleware(['admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);

    Route::controller(AdminUserController::class)->group(function() {
        Route::prefix('admin/user')->group(function () {
            Route::get('/index', 'index');
            Route::get('/getdata', 'getData');
            Route::post('/store', 'store');
            Route::put('/update/{id}', 'update');
            Route::put('/password/{id}', 'password');
            Route::delete('/delete/{id}', 'destroy');
        });
    });
});

//User Role
Route::middleware(['user'])->group(function () {
    Route::get('/user/dashboard', [UserDashboardController::class, 'index']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
