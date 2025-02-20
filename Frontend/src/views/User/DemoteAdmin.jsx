import { useParams, Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';

import BigButton from '../../components/BigButton';

function DemoteAdmin(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ user, setuser ] = useState([]);

    const handleDemotion = async() =>{
        const endpoint = await import.meta.env.VITE_DEMOTE_ADMIN+id;

        const config = {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'https://apps-hibridas-final.onrender.com'
            },
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const user = await res.json();

        if (res.ok) {
            navigate(`/users`, { replace: true });
        }
    }

    useEffect( ()=>{
        const getUser = async()=>{
            const endpoint = await import.meta.env.VITE_USERS+id;

            console.log(endpoint);

            const res = await fetch(endpoint);

            const user = await res.json();

            setuser(user.data);
        }

        getUser();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <h1 className="font-bold text-xl text-center">¿Estas seguro de sacar permisos de administrador a {user.name}?</h1>

                <div className="flex justify-center mt-3">
                    <div className="w-1/3">
                        <div className="flex justify-between">
                            <BigButton color="bg-green-500">
                                <Link to={`/admin`}>Volver</Link>
                            </BigButton>

                           
                            <BigButton color="bg-red-600">
                                <p onClick={handleDemotion}>Bajar</p>
                            </BigButton>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemoteAdmin;