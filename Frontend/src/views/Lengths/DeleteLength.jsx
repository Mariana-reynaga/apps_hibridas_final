import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import BigButton from '../../components/BigButton';

function DeleteLength(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ largo, setlargo ] = useState([]);

    const handleDelete = async() =>{
        const endpoint = await import.meta.env.VITE_DELETE_LENGTH+id;

        const config = {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const color = await res.json();

        if (res.ok) {
            navigate(`/admin`, { replace: true });
        }
    }

    useEffect( ()=>{
        const getLargo = async()=>{
            const endpoint = await import.meta.env.VITE_GET_LENGTH+id;

            console.log(endpoint);

            const res = await fetch(endpoint);

            const largo = await res.json();

            setlargo(largo.data);
        }

        getLargo();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <h1 className="font-bold text-xl text-center">¿Estas seguro de eliminar el largo de pelo "{largo.name}"?</h1>

                <div className="flex justify-center mt-3">
                    <div className="w-1/3">
                        <div className="flex justify-between">
                            <BigButton color="bg-green-500">
                                <Link to={`/admin`}>Volver</Link>
                            </BigButton>

                           
                            <BigButton color="bg-red-600">
                                <p onClick={handleDelete}>Eliminar</p>
                            </BigButton>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteLength;