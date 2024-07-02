<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index() {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function allcategory() {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function edit($id) {
        $category = Category::find($id);
        if($category) {
            return response()->json([
                'status' => 200,
                'category' => $category,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No category founded!',
            ]);
        }
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

            $category = new Category;
            $category->name = $request->input('name');
            $category->description = $request->input('description');
            $category->status = $request->input('status') == true ? '1' : '0';
            $category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Category Added Successfully!',  
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

            $category = Category::find($id);

            if($category) {
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->status = $request->input('status') == true ? '1' : '0';
                $category->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Category Updated Successfully!',  
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No category ID founded!',
                ]);
            }
        }  
    }

    public function destroy($id) {

        $category = Category::find($id);
        
        $category->delete();
        if($category) {
            return response()->json([
                'status' => 200,
                'message' => 'The category deleted successfully!',
            ]); 
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No category ID founded!',
            ]); 
        }
    }
}


