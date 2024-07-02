<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FrontEndController extends Controller
{
    public function category() {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function product($name) {
        $category = Category::where('name', $name)->where('status', '0')->first();
        if($category) {
            $product = Product::where('category_id', $category->id)->where('status', '0')->get();
            if($product) {
                return response()->json([
                    'status' => 200,
                    'product_data' => [
                        'product' => $product,
                        'category' => $category,
                    ]
                ]);
            }
            else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product available found!',
                ]);
            }
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No such category found!',
            ]);
        }
    } 



    public function viewproduct($category, $product) {

        $category = Category::where('name', $category)->where('status', '0')->first();
        if($category) {
            $product = Product::where('category_id', $category->id)->where('name', $product)->where('status', '0')->first();
            if($product) {
                return response()->json([
                    'status' => 200,
                    'product' => $product,
                    
                ]);
            }
            else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product available found!',
                ]);
            }
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No such category found!',
            ]);
        }
    } 
}


