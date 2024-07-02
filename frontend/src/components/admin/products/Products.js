import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";



function Products() {

    const [categoryList, setCategoryList] = useState([]);
    const [image, setImage] = useState([]);
    const [error, setError] = useState([]);

    const [productInput, setProduct] = useState({
        category_id: '',
        name: '',
        description: '',
        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        featured: '',
        popular: '',
        status: '',
    });

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }

    useEffect(() => {
        axios.get(`/api/all-category`).then(res => {
            if(res.data.status === 200) {
                setCategoryList(res.data.category);
            }
        })
    }, []);

    const productSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', image.image);
        formData.append('category_id', productInput.category_id);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);
        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', productInput.featured);
        formData.append('popular', productInput.popular);
        formData.append('status', productInput.status);
        

        let axiosConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(`/api/add-product`, formData, axiosConfig).then(res => {
            if(res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setProduct({ ...productInput, 
                    category_id: '',
                    name: '',
                    description: '',
                    selling_price: '',
                    original_price: '',
                    qty: '',
                    brand: '',
                    featured: '',
                    popular: '',
                    status: '',
                })
                setError([]);
            }
            else if(res.data.status === 422) {
                swal("All fields are required", "", "error");
                setError(res.data.errors);
            }
        });
    }
    
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main> 
                        <div className="container mt-5 px-5">
                            <div className="card-header d-flex justify-content-between items-center mb-3">
                                 <h3>Add Product</h3>
                                <Link className="btn btn-outline-primary" to="/admin/view-product">View Product</Link>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={productSubmit} encType="multipart/form-data">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home"aria-selected="true">Home</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="form-group mb-3">
                                                    <label className="mt-3">Select Category</label>
                                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                                        <option>Select Category</option>
                                                            {
                                                                categoryList && categoryList.map((item) => {
                                                                    return(
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                    </select>
                                                    <small className="text-danger">{error.category_id}</small>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Name</label>
                                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                                    <small className="text-danger">{error.name}</small>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Description</label>
                                                    <textarea type="text" name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                                <div className="row">
                                                    <div className="col-md-4 form-group mb-3 mt-3">
                                                        <label>Selling Price</label>
                                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                                        <small className="text-danger">{error.selling_price}</small>
                                                    </div>
                                                    <div className="col-md-4 form-group mb-3 mt-3">
                                                        <label>Original Price</label>
                                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price}  className="form-control" />
                                                        <small className="text-danger">{error.original_price}</small>
                                                    </div>
                                                    <div className="col-md-4 form-group mb-3 mt-3">
                                                        <label>Quantity</label>
                                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                                                    </div>
                                                    <div className="col-md-4 form-group mb-3">
                                                        <label>Brand</label>
                                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                                        <small className="text-danger">{error.qty}</small>
                                                    </div>
                                                    <div className="col-md-8 form-group mb-3">
                                                        <label>Image</label>
                                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                                        <small className="text-danger">{error.image}</small>
                                                    </div>
                                                    <div className="col-md-4 form-group mb-3">
                                                        <label>Featured (checked=shown) </label>
                                                        <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className="w-40 h-40" />
                                                    </div>
                                                    <div className="col-md-4 form-group mb-3">
                                                        <label>Popular (checked=shown) </label>
                                                        <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className="w-40 h-40" />
                                                    </div>
                                                    <div className="col-md-4 form-group mb-3">
                                                        <label>Status (checked=hidden)</label>
                                                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className="w-40 h-40" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-outline-primary btn-sm">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div> 
            </div>
        </div>
    )
}

export default Products;