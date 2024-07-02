<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index() {
        $product = Product::all();
        return response()->json([
            'status' => 200,
            'product' => $product,
        ]);
    }

    public function store(Request $request) {
        $validate = Validator::make($request->all(), [
            'category_id' => 'required',
            'name' => 'required',
            'brand' => 'required',
            'selling_price' => 'required',
            'original_price' => 'required',
            'qty' => 'required|max:5',
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->messages(),
            ]);
        }
        else {
            $product = new Product;

            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->qty = $request->input('qty');

            if($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() .'.'.$extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/'.$filename;
            }

            $product->featured = $request->input('featured') == true ? '1':'0';
            $product->popular = $request->input('popular')  == true ? '1':'0';
            $product->status = $request->input('status')  == true ? '1':'0';
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product Addedd Successfully!',
            ]);
        }
    }

    public function edit($id) {
        $product = Product::find($id);
        if($product) {
            return response()->json([
                'status' => 200,
                'product' => $product,
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No Product Founded!',
            ]);
        }
    }


    public function update(Request $request, $id) {
        $validate = Validator::make($request->all(), [
            'category_id' => 'required',
            'name' => 'required',
            'brand' => 'required',
            'selling_price' => 'required',
            'original_price' => 'required',
            'qty' => 'required|max:5',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->messages(),
            ]);
        }
        else {
            $product = Product::find($id);

            if($product) {
                $product->category_id = $request->input('category_id');
                $product->name = $request->input('name');
                $product->description = $request->input('description');
                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->qty = $request->input('qty');

                if($request->hasFile('image')) {
                    $path = $product->image;
                        if(File::exists($path)) {
                            File::delete($path);
                        }

                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() .'.'.$extension;
                    $file->move('uploads/product/', $filename);
                    $product->image = 'uploads/product/'.$filename;
                }

                $product->featured = $request->input('featured');
                $product->popular = $request->input('popular');
                $product->status = $request->input('status');
                $product->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Product Updated Successfully!',
                ]);
            }   
            else {
                return response()->json([
                  'status' => 404,
                  'message' => 'Product not found!',
                ]);
            }
        } 
    }

    public function getAllProducts() {
        $products = Product::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'products' => $products,
        ]);
    }
}


