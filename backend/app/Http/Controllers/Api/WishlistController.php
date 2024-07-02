<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Product;

class WishlistController extends Controller
{
    public function addToWishlist(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;

            $product = Product::find($product_id);
            if (!$product) {
                return response()->json([
                    'status' => 404,
                    'message' => 'The Product not found!',
                ]);
            }

            $wishlistItem = Wishlist::where('user_id', $user_id)
                                    ->where('product_id', $product_id)
                                    ->first();
            if ($wishlistItem) {
                return response()->json([
                    'status' => 409,
                    'message' => 'The Product is already in wishlist!',
                ]);
            }

            $newWishlistItem = new Wishlist();
            $newWishlistItem->user_id = $user_id;
            $newWishlistItem->product_id = $product_id;
            $newWishlistItem->save();

            return response()->json([
                'status' => 201,
                'message' => 'The product added successfully in wishlist!',
                'wishlist_item' => $newWishlistItem,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login to add to wishlist!',
            ]);
        }
    }

    public function viewWishlist()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;

            $wishlistItems = Wishlist::where('user_id', $user_id)
                                    ->with('product')
                                    ->get();

            return response()->json([
                'status' => 200,
                'wishlist' => $wishlistItems,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login to see the wishlist!',
            ]);
        }
    }

    public function delete($wishlist_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;

            $wishlistItem = Wishlist::where('id', $wishlist_id)
                                    ->where('user_id', $user_id)
                                    ->first();

            if ($wishlistItem) {
                $wishlistItem->delete();

                return response()->json([
                    'status' => 200,
                    'message' => 'The product was successfully removed from the wishlist!',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'The item in the wishlist was not found!',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login to remove from wishlist!',
            ]);
        }
    }
}
 



