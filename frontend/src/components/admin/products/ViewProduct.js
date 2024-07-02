import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewProduct() {
    const [viewProduct, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "View Product";
        axios.get(`/api/view-product`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return <h3>View Products Loading....</h3>;
    }

    const display_ProductData = viewProduct.map((item) => {
        let productStatus = item.status === 0 ? 'Shown' : 'Hidden';
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category.name}</td>
                <td>{item.name}</td>
                <td>{item.selling_price}</td>
                <td><img src={`http://127.0.0.1:8000/${item.image}`} width="70px" alt={item.name} /></td>
                <td>
                    <Link className="btn btn-outline-primary btn-sm" to={`/admin/edit-product/${item.id}`}>Edit</Link>
                </td>
                <td>
                    {productStatus}
                </td>
            </tr>
        );
    });

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
                                    <h3>View Product</h3>
                                    <Link className="btn btn-outline-primary" to="/admin/add-product">Add Product</Link>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Category Name</th>
                                                <th>Product Name</th>
                                                <th>Selling Price</th>
                                                <th>Image</th>
                                                <th>Edit</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {display_ProductData}
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

export default ViewProduct;
