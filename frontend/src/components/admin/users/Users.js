import React, { useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Users() {

    const [userInput, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInput = (e) => {
        e.persist();

        setUser({ ...userInput, [e.target.name]: e.target.value });
    }

    const submitUser = (e) => {
        e.preventDefault();
    
        const data = {
            name: userInput.name,
            email: userInput.email,
            password: userInput.password,
        }
    
        axios.post(`/api/add-user`, data).then(res => {
            if(res.data.status === 200) {
                swal("Success", res.data.message, "success");
                document.getElementById('user-form').reset();
            }
            else if(res.data.status === 400) {  
                swal("Error", "Please check the entered data.", "error");
            }
        })
        .catch(error => {
            console.log(error);
            swal("Error", "An unexpected error occurred.", "error");
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
                                <div className="card-header d-flex justify-content-between items-center">
                                    <h3>Add User</h3>
                                    <Link className="btn btn-outline-primary" to="/admin/view-user">View User</Link>
                                </div>
                            <form onSubmit={submitUser} id="user-form">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="name" onChange={handleInput} value={userInput.name} className="form-control" />
                                            
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input name="email" onChange={handleInput} value={userInput.email} className="form-control"></input>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input type="password" name="password" onChange={handleInput} value={userInput.password}  className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-outline-primary btn-sm mt-3 mb-3">Submit</button>
                            </form>
                        </div>
                    </main>
                    <Footer />
                </div> 
            </div>
        </div>
    )
}

export default Users;