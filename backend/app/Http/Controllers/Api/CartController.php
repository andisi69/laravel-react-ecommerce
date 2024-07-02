<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    public function addToCart(Request $request) {

        if(auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('id', $product_id)->first();

            if($productCheck) {
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name. 'Already in cart!',
                    ]);
                }
                else {
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_qty = $product_qty;
                    $cartItem->save();
                    return response()->json([
                        'status' => 201,
                        'message' => 'Added to cart!',
                    ]);
                }
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found',
                ]);
            }
        }
        else {
            return response()->json([
                'status' => 401,
                'message' => 'Please Login To Add To Cart!',
            ]);
        }
    }


    public function viewcart() {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cartitems,
            ]);
        }
        else {
            return response()->json([
                 'status' => 401,
                 'message' => 'Please Login To See Cart!',
            ]);
        }
    }

    public function update($cart_id, $scope) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if($scope == "inc") {
                $cartItem->product_qty += 1;
            }
            else if($scope == "dec") {
                $cartItem->product_qty -= 1;
            }
            $cartItem->update();
              
            return response()->json([
                'status' => 200,
                'message' => 'QTY updated!',
            ]);
        }   
        else {
            return response()->json([
                'status' => 401,
                'message' => 'Please Login To Continue!',
            ]);  
        }
    }

    public function delete($cart_id) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if($cartItem) {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Item deleted Successfully!',
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Item not Found!',
                ]);
            }
        }
        else {
            return response()->json([
                'status' => 401,
                'message' => 'Please Login To Continue!',
            ]);  
        } 
    } 
}


