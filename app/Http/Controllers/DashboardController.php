<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        if(Auth::check()){
            $role = Auth::user()->role;

            if($role === 0){
                return redirect('/admin/dashboard');
            } else if($role === 1){
                return redirect('/user/dashboard');
            } else{
                return redirect('/');
            }
        }
    }
}
