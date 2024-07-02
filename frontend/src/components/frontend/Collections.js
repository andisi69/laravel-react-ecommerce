import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";

const Collections = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get(`/api/getCategory`).then(res => {
            if(res.data.status === 200) {
                setCategory(res.data.category);
            }
        })
    }, []);

    var showCategoryList = '';
    showCategoryList = category.map((item, id) => {
        return (
            <div className="col-md-3" key={id}>
                <div className="card bg-secondary">
                    <div className="card-body text-center">
                        <Link to={`${item.name}`} className="text-decoration-none text-light">
                            <h3>{item.name}</h3>
                        </Link>
                    </div>
                </div>
            </div>

        )
    })

    return (
        <>
        
        <div className="container">
        <Navbar />
            <div className="py-3 mt-5">
                <div className="row">
                    {showCategoryList}
                </div>
            </div>
        </div>
        </>
    )
}

export default Collections;