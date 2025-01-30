import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();

    const logout = async()=>{
        const endpoint = import.meta.env.VITE_LOGOUT;

        const config = {
            method: 'GET',
            headers:{
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);
        
        const data = await res.json();

        navigate(`/`, { replace: true });
        location.reload();
    }

    logout();
    return(
        <></>
    )
}

export default Register;