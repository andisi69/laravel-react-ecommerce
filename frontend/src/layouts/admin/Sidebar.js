import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Menu</div>
                    <Link className="nav-link" to="/admin">
                        <div className="sb-nav-link-icon"><i className="bi bi-window-sidebar"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link collapsed" to="/admin/user" data-bs-toggle="collapse" data-bs-target="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                        <div className="sb-nav-link-icon"><i className="bi bi-arrow-down-square"></i></div>
                        Users
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseUser" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-user">
                                <div className="sb-nav-link-icon"><i className="bi bi-cloud-plus"></i></div>
                                Add User
                            </Link>
                            <Link className="nav-link" to="/admin/view-user">
                                <div className="sb-nav-link-icon"><i className="bi bi-eye"></i></div>
                                View User
                            </Link>
                        </nav>
                    </div>
                    <Link className="nav-link collapsed" to="/admin/product" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="bi bi-arrow-down-square"></i></div>
                        Products
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-product">
                                <div className="sb-nav-link-icon"><i className="bi bi-cloud-plus"></i></div>
                                Add Product
                            </Link>
                            <Link className="nav-link" to="/admin/view-product">
                                <div className="sb-nav-link-icon"><i className="bi bi-eye"></i></div>
                                View Product
                            </Link>
                        </nav>
                    </div>
                    <Link className="nav-link collapsed" to="/admin/category" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
                        <div className="sb-nav-link-icon"><i className="bi bi-arrow-down-square"></i></div>
                        Category
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-category">
                                <div className="sb-nav-link-icon"><i className="bi bi-cloud-plus"></i></div>
                                Add Category
                            </Link>
                            <Link className="nav-link" to="/admin/view-category">
                                <div className="sb-nav-link-icon"><i className="bi bi-eye"></i></div>
                                View Category
                            </Link>
                        </nav>
                    </div>                    
                    <Link className="nav-link" to="/admin/orders">
                        <div className="sb-nav-link-icon"><i className="bi bi-list-ul"></i></div>
                        Orders
                    </Link> 
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Admin
            </div>
        </nav>
    )
}

export default Sidebar;