import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

function EditUser() {

    const [userInput, setUser] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState([]);


    useEffect(() => {
        if(id) {
            axios.get(`/api/edit-user/${id}`).then(res => {
                if (res.data.status === 200) {
                    setUser(res.data.user);
                } 
                else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate('/admin/view-user');
                }
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
        }
    }, [id,navigate]); 

    const handleInput = (e) => {
        e.persist();

        setUser({ ...userInput, [e.target.name]: e.target.value });
    }

    const updateUser = (e) => {
        e.preventDefault();

        const data = userInput;

        if(id) {
            axios.put(`/api/update-user/${id}`, data) .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setError([]);
                    navigate('/admin/view-user');
                } 
                else if (res.data.status === 422) {
                    swal("All fields are mandatory", "", "error");
                    setError(res.data.errors)
                }
                else if(res.data.status === 404){
                    swal("Error", res.data.message, "error")
                    navigate('/admin/view-user')
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
                                    <h3>Edit User</h3>
                                    <Link className="btn btn-outline-primary" to="/admin/view-user">View User</Link>
                                </div>
                            <form onSubmit={updateUser} id="user-form">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="name" onChange={handleInput} value={userInput.name || ''} className="form-control" />
                                            
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input type="email" name="email" onChange={handleInput} value={userInput.email || ''} className="form-control"></input>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input type="password" name="password" onChange={handleInput} value={userInput.password || ''} className="form-control" />
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

export default EditUser;