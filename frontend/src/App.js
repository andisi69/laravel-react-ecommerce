import React from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
import Home from "./components/frontend/Home";
import PrivateRoute from "./PrivateRoute";
import Main from './layouts/admin/Main';
import Category from './components/admin/category/Category';
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import Products from "./components/admin/products/Products";
import ViewProduct from "./components/admin/products/ViewProduct";
import EditProduct from "./components/admin/products/EditProduct";
import Order from "./components/admin/orders/Order";
import Users from "./components/admin/users/Users";
import ViewUser from './components/admin/users/ViewUser';
import PublicRoute from "./PublicRoute";
import Collections from './components/frontend/Collections';
import Cart from './components/frontend/Cart';
import DetailProduct from './components/frontend/DetailProduct';
import ViewProducts from "./components/frontend/ViewProducts";
import Checkout from './components/frontend/Checkout';
import EditUser from "./components/admin/users/EditUser";
import Wishlists from "./components/frontend/Wishlist";



axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Route */}
        <Route path="/login" element={localStorage.getItem('auth_token') ?  <Navigate to="/"/> :  <Login/>} />
        <Route path="/register" element={localStorage.getItem('auth_token') ?  <Navigate to="/"/> :  <Register/>} />

        {/* Public Route  */}
        <Route element={<PublicRoute />}>
          <Route path="/collections" exact element={<Collections />} />
          <Route path="/collections/:category/:product" exact element={<DetailProduct />} />
          <Route path="/collections/:name" exact element={<ViewProducts />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/wishlist" exact element={<Wishlists />} />
        </Route>

          {/* Admin Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" exact element={<Main />} />
          <Route path="/admin/add-user" exact element={<Users />} />
          <Route path="/admin/view-user" exact element={<ViewUser />} />
          <Route path="/admin/edit-user/:id" exact element={<EditUser />} />
          <Route path="/admin/add-category" exact element={<Category />} />
          <Route path="/admin/view-category" exact element={<ViewCategory />} />
          <Route path="/admin/edit-category/:id" exact element={<EditCategory />} />
          <Route path="/admin/add-product" exact element={<Products />} />
          <Route path="/admin/view-product" exact element={<ViewProduct />} />
          <Route path="/admin/edit-product/:id" exact element={<EditProduct />} />
          <Route path="/admin/orders" exact element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
