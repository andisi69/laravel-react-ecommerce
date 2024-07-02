import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Register() {

    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.post(`/api/register`, data).then(res => {
            if(res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                navigate('/login'); 
            } else {
                setRegister({...registerInput, error_list: res.data.validation_errors});
            }
        });
    }
    
    return (
        <div className="container">
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3>Register Here!</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="name" name="name" onChange={handleInput} value={registerInput.name} className="form-control"  />
                                        {registerInput.error_list && registerInput.error_list.name && (
                                        <span className="text-danger">{registerInput.error_list.name}</span>
                                        )}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control"  />
                                        {registerInput.error_list && registerInput.error_list.email && (
                                        <span className="text-danger">{registerInput.error_list.email}</span>
                                        )}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control"  />
                                        {registerInput.error_list && registerInput.error_list.password && (
                                            <span className="text-danger">{registerInput.error_list.password}</span>
                                        )}
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-outline-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Register;