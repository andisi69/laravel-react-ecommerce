import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import Footer from "../../../layouts/admin/Footer";
import axios from "axios";

function Order() {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/admin/orders`).then(res => {
            if (res.data.status === 200) {;
                setOrder(res.data.orders);
            } else {
                console.error("Status i papritur: ", res.data.status);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Gabim në marrjen e të dhënave: ", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <h3>Loading Orders....</h3>;
    }

    const display_orders = Array.isArray(order) && order.map((item) => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tracking_no}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
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
                                    <h3>Orders</h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tracking No.</th>
                                                <th>Phone No.</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {display_orders}
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

export default Order;

