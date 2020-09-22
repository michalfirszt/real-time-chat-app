<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Handle a login request
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * 
     * @throws \Exception
     */
    public function login(Request $request)
    {
        $data = $request->all();

        $user = User::where('email', '=', $data['email'])->first();

        if (isset($user)) {
            if (password_verify($data['password'], $user->getAuthPassword())) {
                return response()->json(["apiToken" => $user->api_token]);
            }
        }

        throw new \Exception('Access denied', 403);
    }
}
