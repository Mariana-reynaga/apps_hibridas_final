import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function LoginCheck(props) {
    const user = props.check;

    return user == false ? <Outlet/> : <Navigate to='/' />
}

export default LoginCheck;