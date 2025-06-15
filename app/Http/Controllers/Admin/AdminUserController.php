<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    public function getdata(Request $request)
    {
        $query =  User::where('id', '!=', Auth::user()->id)
                    ->where('name', 'like', "%{$request->search}%")
                    ->where('status', 'like', "%{$request->status}%")
                    ->where('role', 'like', "%{$request->role}%");

                    if($request->verified === 'yes'){
                        $query->whereNotNull('email_verified_at');
                    }elseif ($request->verified === 'no') {
                        $query->whereNull('email_verified_at');
                    }

        return $query->orderBy('id', $request->order)->paginate(10);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                    Rule::unique('users')
                ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:0,1',
            'status' => 'required|in:0,1',
        ]);


        User::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                    Rule::unique('users')->ignore($id),
                ],
            'role' => 'required|in:0,1',
            'status' => 'required|in:0,1',
        ]);

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function password(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $data = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $data['password'] = Hash::make($data['password']);

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        $user->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
