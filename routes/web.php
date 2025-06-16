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

    Route::get('/admin/user/index', [AdminUserController::class, 'index']);
    Route::get('/admin/user/getdata', [AdminUserController::class, 'getData']);
    Route::post('/admin/user/store', [AdminUserController::class, 'store']);
    Route::put('/admin/user/update/{id}', [AdminUserController::class, 'update']);
    Route::put('/admin/user/password/{id}', [AdminUserController::class, 'password']);
    Route::delete('/admin/user/delete/{id}', [AdminUserController::class, 'destroy']);
});
//User Role
Route::middleware(['user'])->group(function () {
    Route::get('/user/dashboard', [UserDashboardController::class, 'index']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
