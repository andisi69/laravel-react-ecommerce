import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Cart() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/');
            swal("Warning", "Login to go to Cart Page", "error");
        } else {
            fetchCartData();
        }
    }, [navigate]);

    const fetchCartData = () => {
        axios.get(`/api/cart`).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.cart);
                calculateSubtotal(res.data.cart);
            } else if (res.data.status === 401) {
                navigate('/');
                swal("Warning", res.data.message, "error");
            }
        });
    };

    const calculateSubtotal = (cart) => {
        const total = cart.reduce((acc, item) => acc + item.product.selling_price * item.product_qty, 0);
        setSubtotal(total);
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('subtotal', total);
    };
    

    const handleDecrement = (cart_id) => {
        const updatedCart = cart.map((item) =>
            cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
        );
        setCart(updatedCart);
        updateCartQty(cart_id, "dec", updatedCart);
    };

    const handleIncrement = (cart_id) => {
        const updatedCart = cart.map((item) =>
            cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 15 ? 1 : 0) } : item
        );
        setCart(updatedCart);
        updateCartQty(cart_id, "inc", updatedCart);
    };

    const updateCartQty = (cart_id, scope, updatedCart) => {
        axios.put(`/api/cart-update-qty/${cart_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
                setCart(updatedCart); 
                calculateSubtotal(updatedCart); 
            } else {
                fetchCartData(); 
            }
        });
    };

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();
        axios.delete(`/api/deleteCartItem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                const updatedCart = cart.filter(item => item.id !== cart_id);
                setCart(updatedCart);
                calculateSubtotal(updatedCart);
            } else if (res.data.status === 404) {
                swal("Warning", res.data.message, "error");
            }
        });
    };

    return (
        <div className="container">
            <Navbar cartCount={cart.length} />
            <h5 className="mt-5 bg-secondary text-white py-3">Home/Cart</h5>
            <div className="py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">QTY</th>
                                        <th className="text-center">Total Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.length > 0 ? cart.map((item) => (
                                        <tr key={item.id}>
                                            <td width="10%">
                                                <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px" />
                                            </td>
                                            <td>{item.product?.name || 'Product name unavailable'}</td>
                                            <td width="15%" className="text-center">{item.product.selling_price}</td>
                                            <td width="15%">
                                                <div className="input-group">
                                                    <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                                                    <div className="form-control text-center">{item.product_qty}</div>
                                                    <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                                                </div>
                                            </td>
                                            <td width="15%" className="text-center">{item.product.selling_price * item.product_qty}</td>
                                            <td width="10%">
                                                <button type="button" onClick={(e) => deleteCartItem(e, item.id)} className="btn btn-sm btn-danger">Remove</button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">Your cart is empty</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-8">
                    </div>
                    <div className="col-md-4">
                        {cart.length > 0 && (
                            <div className="card card-body mt-5">
                                <h4>Sub Total:
                                    <span className="float-end">{subtotal}</span>
                                </h4>
                                <hr />
                                <Link to="/checkout" className="btn btn-outline-primary">Checkout</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
