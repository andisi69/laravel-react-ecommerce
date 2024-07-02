import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Navbar from "../../layouts/frontend/Navbar";
import Footer from '../../layouts/frontend/Footer';
import { useNavigate } from "react-router-dom";

function Wishlists() {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/');
            swal("Warning", "Login to go to Wishlist Page", "error");
        } else {
            fetchWishlistData();
        }
    }, [navigate]);

    const fetchWishlistData = () => {
        axios.get(`/api/wishlist`).then(res => {
            if (res.data.status === 200) {
                setWishlist(res.data.wishlist);
            } else if (res.data.status === 401) {
                navigate('/');
                swal("Warning", res.data.message, "error");
            }
        }).catch(error => {
            console.error('Error fetching wishlist:', error);
        });
    };


    const removeFromWishlist = (item_id) => {
        axios.delete(`/api/deleteWishlistItem/${item_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                fetchWishlistData();
                
            } else if (res.data.status === 404) {
                swal("Warning", res.data.message, "error");
            }
        })
        .catch(error => {
            console.error('Error removing item from wishlist:', error);
        });
    };

    return (
        <>
        <div className="container">
            <Navbar />
            <h5 className="mt-5 bg-secondary text-white py-3">Wishlist</h5>
            <div className="py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>
                                                <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px" />
                                            </td>
                                            <td>{item.product.name}</td>
                                            <td>${item.product.selling_price}</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeFromWishlist(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {wishlist.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center">Your wishlist is empty</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Wishlists;
