import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";



function EditCategory()  {

    const [categoryInput, setCategory] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [error, setError] = useState([]);

    useEffect(() => {
        if(id) {
            axios.get(`/api/edit-category/${id}`).then(res => {
                if (res.data.status === 200) {
                    setCategory(res.data.category);
                } 
                else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate('/admin/view-category');
                }
            })
            .catch(error => {
                console.error("Error fetching category:", error);
            });
        }
    }, [id,navigate]); 
        

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const updateCategory = (e) => {
        e.preventDefault();
        const data = categoryInput;

        if(id) {
            axios.put(`/api/update-category/${id}`, data) .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setError([]);
                    navigate('/admin/view-category');
                } 
                else if (res.data.status === 422) {
                    swal("All fields are mandatory", "", "error");
                    setError(res.data.errors)
                }
                else if(res.data.status === 404){
                    swal("Error", res.data.message, "error")
                    navigate('/admin/view-category')
                }
            });
        }  
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
                            <div className="card-header d-flex justify-content-between items-center">
                                <h3>Edit Category</h3>
                                <Link className="btn btn-outline-primary" to="/admin/view-category">Back</Link>
                            </div>
                            <form onSubmit={updateCategory} id="category-form">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                                    </li>
                               </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name || ''} className="form-control" />
                                            <small className="text-danger">{error.name}</small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Description</label>
                                            <textarea name="description" onChange={handleInput} value={categoryInput.description || ''} className="form-control"></textarea>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Status</label>
                                            <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status || ''} /> Status 0=show/1=hidden
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-outline-primary btn-sm mt-3 mb-3">Update</button>
                            </form>
                        </div>
                    </main>
                    <Footer />
                </div> 
            </div>
        </div>
    )
}

export default EditCategory;