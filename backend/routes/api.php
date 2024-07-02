<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\FrontEndController;
use App\Http\Controllers\Api\WishlistController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('getCategory', [FrontEndController::class, 'category']);
Route::get('getProducts/{name}', [FrontEndController::class, 'product']);
Route::get('viewproduct/{category}/{product}', [FrontEndController::class, 'viewproduct']);

Route::get('all-products', [ProductController::class, 'getAllProducts']);

Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::get('cart', [CartController::class, 'viewcart']);
Route::put('cart-update-qty/{cart_id}/{scope}', [CartController::class, 'update']);
Route::delete('deleteCartItem/{cart_id}', [CartController::class, 'delete']);


Route::post('add-to-wishlist', [WishlistController::class, 'addToWishlist']);
Route::get('wishlist', [WishlistController::class, 'viewWishlist']);
Route::delete('deleteWishlistItem/{wishlist_id}', [WishlistController::class, 'delete']);

Route::post('place-order', [CheckoutController::class, 'placeorder']);



// ADMIN MIDDLEWARE
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/checkAuth', function () {
        return response()->json([
            'message' => 'You are in',
            'status' => 200,
        ]);   
    });

    // Users API
    Route::get('/users', [UserController::class, 'index']);
    Route::post('add-user', [UserController::class, 'store']);
    Route::get('edit-user/{id}', [UserController::class, 'edit']);
    Route::put('update-user/{id}', [UserController::class, 'update']);
    Route::delete('delete-user/{id}', [UserController::class, 'destroy']);

    // Category API
    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('view-category', [CategoryController::class, 'index']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('all-category', [CategoryController::class, 'allcategory']);

    // Product API
    Route::post('add-product', [ProductController::class, 'store']);
    Route::get('view-product', [ProductController::class, 'index']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);

    // Orders API
    Route::get('/admin/orders', [OrderController::class, 'index']);
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});



// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
