<?php

use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// auth0 auth routes
Route::get('/login', Login::class)->name('login');
// use local version to logout to main url, welcome route
#Route::post('/logout', App\Http\Controllers\Logout::class)->name('logout');
Route::get('/logout', Logout::class)->name('logout');
Route::get('/auth/callback', Callback::class)->name('auth.callback');

Route::get('{path?}', function () {
    return view('app');
})->middleware('auth0.authenticate');
