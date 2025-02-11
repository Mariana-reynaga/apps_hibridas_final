import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function LoginCheck(props) {
    const user = props.check;

    const boolean = props.bool;

    return user == boolean ? <Outlet/> : <Navigate to='/' />
}

export default LoginCheck;