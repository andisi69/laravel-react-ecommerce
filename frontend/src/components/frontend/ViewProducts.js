import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import swal from "sweetalert";

function ViewProducts() {

    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const { name } = useParams();
    
    useEffect(() => {
        axios.get(`/api/getProducts/${name}`).then(res => {
            if(res.data.status === 200) {
                setProduct(res.data.product_data.product);
                setCategory(res.data.product_data.category);
            }
            else if(res.data.status === 400) {
                swal("Warning", res.data.message, "");
            }
            else if(res.data.status === 404) {
                navigate('/collections');
                swal("Warning" ,res.data.message, "error");
            }
        })
    }, [name, navigate]);

    const addToCart = (productId) => {
        const data = {
            product_id: productId,
            product_qty: 1,
        };

        axios.post(`/api/add-to-cart`, data).then(res => {
            if(res.data.status === 201) {
                swal("Success", res.data.message, "success");
            }
            else if(res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            }
            else if(res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if(res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    };

    const showProduct = product.map((item, id) => (
        <div className="col-md-3" key={id}>
            <div className="card mb-4" style={{ width: '280px', margin: '0 auto' }}>
                <Link to={`/collections/${item.category.name}/${item.name}`}>
                    <img src={`http://127.0.0.1:8000/${item.image}`} className="w-100 img-fluid" style={{width: '180px', height: '230px'}} alt={item.name} />
                </Link>
                <div className="card-body">
                    <Link to={`/collections/${item.category.name}/${item.name}`}>
                        <h4 className="text-center mt-3">{item.name}</h4>
                    </Link>
                    <div className="d-flex justify-content-between mt-3">
                    <b>Price: ${item.selling_price}</b>
                    <b>{item.brand}</b>
                    </div>
                    
                    <div className="text-center mt-3">
                        <button type="button" onClick={() => addToCart(item.id)} className="btn btn-secondary text-white w-50">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <Navbar />
            <div className="py-3 bg-secondary text-white">
                <h5 className="ms-3">Collections / {category.name}</h5>
            </div>
            <div className="py-3">
                <div className="row mt-4">
                    {showProduct}
                </div>
            </div>
        </div>
    );
}

export default ViewProducts;
