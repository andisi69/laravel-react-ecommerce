import React, { useEffect, useState } from "react";
import Navbar from '../../layouts/frontend/Navbar';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Footer from "../../layouts/frontend/Footer";


function DetailProduct() {

    const [product, setProduct] = useState([]);
    const { category, product: productName } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);



    useEffect(() => {
        axios.get(`/api/viewproduct/${category}/${productName}`).then(res => {
            if(res.data.status === 200) {
                setProduct(res.data.product);
            }
            else if(res.data.status === 404) {
                navigate('/collections');
                swal("Warning" ,res.data.message, "error");
            }
        })
    },  [category, productName, navigate]);


    const handleDecrement = () => {
        if (qty > 1) {
            setQty(prevCount => prevCount - 1);
        }
    };

    const handleIncrement = () => {
        setQty(prevCount => prevCount + 1);
    };


    const addToCart = (e) => {
        e.preventDefault();
        const data = {
            product_id: product.id,
            product_qty: qty,
        }

        axios.post(`/api/add-to-cart`, data).then(res => {
            if(res.data.status === 201) {
                swal("Success", res.data.message, "success");
            }
            else if(res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            }
            else if(res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if(res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        })
    }


    const addToWishlist = (e) => {
        e.preventDefault();
        const data = {
            product_id: product.id,
        }

        axios.post(`/api/add-to-wishlist`, data).then(res => {
            if(res.data.status === 201) {
                swal("Success", res.data.message, "success");
            }
            else if(res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            }
            else if(res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if(res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        })
    }

    let stock = '';
    if(product.qty > 0) {
        stock = (
            <div>
                <button type="button" className="btn-sm btn btn-danger mt-2">In Stock</button>
                <div className="row">
                    <div className="col-md-3 mt-4">
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} 
                            className="input-group-text">-</button>
                            <div className="form-control text-center">{qty}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                        </div>
                    </div>
                    <div className="mt-3 d-flex">
                        <button type="button" onClick={addToCart} className="btn btn-sm btn-outline-primary me-2">Add to Cart <i className="bi bi-cart"></i></button>
                        <button type="button" onClick={addToWishlist} className="btn btn-sm btn-outline-danger">Add to Wishlist <i className="bi bi-bookmark-heart"></i></button>
                    </div>
                </div>
            </div>
        );
    } else {
        stock = (
            <div>
                <button type="button" className="btn-sm btn btn-danger mt-2">Out of Stock</button>
            </div>
        );
    }

    
    return (
        <>
        <div className="container">
            <Navbar />
            <div className="mt-5">
                <h3>{category}</h3>
            </div>
            <div className="py-3">
                <div className="row">
                    <div className="col-md-4 border-end">
                        <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} className="w-100" />
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between mb-3">
                            <h4>{product.name}</h4>
                            <button className="btn btn-warning">{product.brand}</button>
                        </div>
                        <p>{product.description}</p>
                        <h4 className="mb-1">
                            {product.selling_price}&#8364;
                            <s className="ms-4">{product.original_price}</s>&#8364;
                            {stock}
                        </h4>
                    </div>    
               </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default DetailProduct;