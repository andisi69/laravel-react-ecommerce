import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import Slider from "../../layouts/frontend/Slider";
import Footer from "../../layouts/frontend/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Home() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [searchMessage, setSearchMessage] = useState("");

    useEffect(() => {
        axios.get(`/api/all-products`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
                setDisplayedProducts(res.data.products.slice(0, 12)); // Fillimisht shfaq 12 produkte
                setShowMore(res.data.products.length > 12); // Tregon butonin "Show More" vetëm nëse ka më shumë se 12 produkte
            }
        }).catch(error => console.error("Error fetching products:", error));
    }, []);

    const addToCart = (productId) => {
        const data = {
            product_id: productId,
            product_qty: 1,
        };

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    };

    const addToWishlist = (productId) => {
        const data = {
            product_id: productId,
            
        };

        axios.post(`/api/add-to-wishlist`, data).then(res => {
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    };

    const handleShowMore = () => {
        if (displayedProducts.length < products.length) {
            const newDisplayedProducts = products.slice(0, displayedProducts.length + 12);
            setDisplayedProducts(newDisplayedProducts);
            setShowMore(newDisplayedProducts.length < products.length);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredProducts.length === 0) {
            setSearchMessage("Produkti juaj nuk u gjet.");
        } else {
            setDisplayedProducts(filteredProducts.slice(0, 12));
            setShowMore(filteredProducts.length > 12);
            setSearchMessage(""); 
        }
    };

    const showProduct = displayedProducts.map((product, id) => (
        <div className="col-md-3" key={id}>
            <div className="card mb-4" style={{ width: '280px', margin: '0 auto' }}>
                <Link to={`/collections/${product.category.name}/${product.name}`}>
                    <img src={`http://127.0.0.1:8000/${product.image}`} className="w-100 img-fluid" style={{ width: '180px', height: '200px' }} alt={product.name} />
                </Link>
                <div className="card-body">
                    <Link className="text-decoration-none text-black" to={`/collections/${product.category.name}/${product.name}`}>
                        <h4 className="text-center mt-3">{product.name}</h4>
                    </Link>
                    <div className="d-flex justify-content-between mt-3">
                        <b>Price: ${product.selling_price}</b>
                        <b>{product.brand}</b>
                    </div>
                    <div className="text-center mt-3">
                        <button type="button" onClick={() => addToCart(product.id)} className="btn btn-sm btn-outline-primary me-2">Add to Cart</button>
                        <button type="button" onClick={() => addToWishlist(product.id)} className="btn btn-sm btn-outline-danger">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className="container">
                <Navbar />
            </div>
            <Slider />
            <div className="mt-5 text-center">
                <h3>All Products</h3>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 mb-4">
                        <form className="input-group mb-3" onSubmit={handleSearch}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </form>
                        {searchMessage && (
                            <p className="text-center text-danger">{searchMessage}</p>
                        )}
                    </div>
                </div>
                <div className="row">
                    {showProduct}
                </div>
                {showMore && (
                    <div className="text-center mt-3">
                        <button className="btn btn-secondary" onClick={handleShowMore}>Show More Products</button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
