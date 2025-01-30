import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function AdminCheck(props) {
    const user = props.check;

    return user == true ? <Outlet/> : <Navigate to='/' />
}

export default AdminCheck;