import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-category`).then(res => {
            if(res.status === 200) {
                setCategoryList(res.data.category);
            } 
            setLoading(false);
        })
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const clicked = e.currentTarget;
        clicked.innerText = "Deleting";

        axios.delete(`/api/delete-category/${id}`).then(res => {
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

    var viewcategory_HTMLTABLE = "";

    if(loading) {
        return <h3>Loading Category...</h3>
    } else {
        viewcategory_HTMLTABLE = categoryList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link className="btn btn-outline-primary btn-sm" to={`/admin/edit-category/${item.id}`}>Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={ (e) => deleteCategory(e, item.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
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
                        <div className="container mt-5">
                            <div className="card mx-5">
                                <div className="card-header d-flex justify-content-between items-center">
                                    <h3>View Category</h3>
                                    <Link className="btn btn-outline-primary" to="/admin/add-category">Add Category</Link>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>{viewcategory_HTMLTABLE}</tbody>
                                    </table>
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

export default ViewCategory;