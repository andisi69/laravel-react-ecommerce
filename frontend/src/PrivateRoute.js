import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";


function PrivateRoute() {
      
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/checkAuth`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
        })
        .catch(error => {
            console.error("Authentication check failed:", error);
            setAuthenticated(false);
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
            if(err.response.status === 401) {
                navigate('/');
            }
            return Promise.reject(err);
        });       
    });

    axios.interceptors.response.use(function(response) {
        return response;
        }, function (error) {
            if(error.response.status === 403) {
                navigate('/');
            }
            else if(error.response.status === 404) {
                navigate('/');
            }
            return Promise.reject(error);
        }
    )

    if (loading) {
        return <div>Loading...</div>; 
    } 
    

   return (
        authenticated ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoute;