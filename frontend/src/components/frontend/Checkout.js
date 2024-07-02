import React, { useEffect, useState } from "react";
import Navbar from '../../layouts/frontend/Navbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Checkout() {

    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState([]);

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

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
            } else if (res.data.status === 401) {
                navigate('/');
                swal("Warning", res.data.message, "error");
            }
        });
    };

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        const subtotalData = localStorage.getItem('subtotal');
        if (cartData) setCart(cartData);
        if (subtotalData) setSubtotal(Number(subtotalData));
    }, []);
    

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    };

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
        };

        
        axios.post(`/api/place-order`, data).then(res => {
            if(res.data.status === 200) {
                swal("Order Placed Successfully!", res.data.message, "success");
                setError([]);
                navigate('/thank-you');
            }
            else if(res.data.status === 422) {
                swal("All fields are required", "", "error");
                setError(res.data.errors);
            }
        });
    };

    return (
        <div className="container">
            <Navbar />
            <h5 className="mt-5 bg-secondary text-white py-3">Home / Checkout</h5>
            <div className="py-5">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">
                                <h4>Your Information</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>First Name</label>
                                            <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                            <small className="text-danger">{error.lastname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone Number</label>
                                            <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <input type="text" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control" />
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>City</label>
                                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>State</label>
                                            <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                            <small className="text-danger">{error.state}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Zip Code</label>
                                            <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                            <small className="text-danger">{error.zipcode}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button type="button" onClick={submitOrder} className="btn btn-outline-secondary me-2">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>QTY</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product.name}</td>
                                        <td>{item.product.selling_price}</td>
                                        <td>{item.product_qty}</td>
                                        <td>{item.product.selling_price * item.product_qty}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" className="text-end">Subtotal</td>
                                    <td><b>{subtotal}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
