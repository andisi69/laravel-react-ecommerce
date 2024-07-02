<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
   public function placeorder(Request $request) {
      if(auth('sanctum')->check()) {
         $validate = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zipcode' => 'required',
         ]);

         if($validate->fails()) {
            return response()->json([
               'status' => 422,
               'errors' => $validate->messages(),
            ]);
         }
         else {
            $user_id = auth('sanctum')->user()->id;
            $order = new Order;
            $order->user_id = $user_id;
            $order->firstname = $request->firstname;
            $order->lastname = $request->lastname;
            $order->phone = $request->phone;
            $order->email = $request->email;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->state = $request->state;
            $order->zipcode = $request->zipcode;

            $order->payment_mode = "COD";
            $order->tracking_no = 'ecom'.rand(1111,9999);
            $order->save();

            $cart = Cart::where('user_id', $user_id)->get();
         
            $orderitems = [];
            foreach($cart as $item) {
               $orderitems[] = [
                  'product_id' => $item->product_id,
                  'qty' => $item->product_qty,
                  'price' => $item->product->selling_price,
               ];

               $item->product->update([
                  'qty' => $item->product->qty - $item->product_qty,
               ]);
            }

            $order->orderitems()->createMany($orderitems);
            Cart::destroy($cart);
            return response()->json([
               'status' => 200,
               'message' => 'Order placed successfully!',
            ]);
         }
      }
      else {
         return response()->json([
            'status' => 401,
            'message' => 'Login to continue!',
         ]);
      }
   }
}
