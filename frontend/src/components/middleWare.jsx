import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const middleWare = () => {
    let auth = false;
    if (localStorage.getItem("isloginesatateuser")) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default middleWare;