import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function DeleteCheck(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ detalle, setDetalle ] = useState([]);

    const handleDelete = async() =>{
        const endpoint = await import.meta.env.VITE_DELETE_CAT+id;

        const config = {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const detalle = await res.json();

        console.log(detalle);

        if (res.ok) {
            navigate(`/cats`, { replace: true });
            location.reload();
        }
    }

    useEffect( ()=>{
        const getGato = async() =>{
            const endpoint = await import.meta.env.VITE_GET_CAT_EDIT+id;

            const res = await fetch(endpoint);

            const detalle = await res.json();

            setDetalle(detalle.data);   
        }
        
        
        getGato();
        }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <h1>¿Estas seguro de eliminar {detalle.nombre}?</h1>

                <div className="w-1/3 mt-3">
                    <div className="flex justify-between">
                        
                        <button className="bg-green-500">
                            <Link to={`/cats/${id}`}>Nooooo</Link>
                        </button>

                        <button className="bg-red-600" onClick={handleDelete}>
                            yeeeeeeees
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCheck