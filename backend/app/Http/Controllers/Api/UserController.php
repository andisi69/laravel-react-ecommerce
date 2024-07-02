<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index() {

        $users = User::all();
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }


    public function store(Request $request) {

        $validate = Validator::make($request->all(), [
            'name' => 'required|max:255',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validate->messages(),  
            ]);
        }
        else {

            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = $request->input('password');
            $user->save();

            return response()->json([
                'status' => 200,
                'message' => 'User Added Successfully!',  
            ]);
        }  
    }

    public function edit($id) {
        $user = User::find($id);
        if($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No User founded!',
            ]);
        }
    }


    public function update(Request $request, $id) {

        $validate = Validator::make($request->all(), [
            'name' => 'required|max:255',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->messages(),  
            ]);
        }
        else {

            $user = User::find($id);

            if($user) {
                $user->name = $request->input('name');
                $user->email = $request->input('email');
                $user->password = $request->input('password');
                $user->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'User Updated Successfully!',  
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No User ID founded!',
                ]);
            }
        }  
    }

    public function destroy($id) {
        $users = User::find($id);
        $users->delete();
        if($users) {
            return response()->json([
                'status' => 200,
                'message' => 'The User deleted successfully!',
            ]); 
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No User ID founded!',
            ]); 
        }
    }
}
