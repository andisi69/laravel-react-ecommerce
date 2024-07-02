import React, { useEffect, useState } from 'react';
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function ViewUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }).then(response => {
            if(response.data.status === 200) {
                setUsers(response.data.users);
                setLoading(false);
            }
        })
        .catch(error => {
            console.error('There was an error fetching the users!', error);
        });
    }, []);

    const deleteUser = (e, id) => {
        e.preventDefault();

        const clicked = e.currentTarget;
        clicked.innerText = "Deleting";

        axios.delete(`/api/delete-user/${id}`).then(res => {
            if(res.data.status === 200) {
                swal("Succes", res.data.message, "success");
                clicked.closest("tr").remove();
            }
            else if(res.data.status === 404) {
                swal("Success", res.data.message, "succes");
                clicked.innerText = "Delete";
            }
        });
    }

    if(loading) {
        return <div>Loading...</div>;
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
                        <div className="container mt-5">
                            <div className="card mx-5">
                                <div className="card-header d-flex justify-content-between items-center">
                                    <h3>Users</h3>
                                    <Link className="btn btn-outline-primary" to="/admin/add-user">Add User</Link>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <Link className="btn btn-outline-primary btn-sm" to={`/admin/edit-user/${user.id}`}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button type="button" onClick={ (e) => deleteUser(e, user.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>  
    );
}

export default ViewUser;


 