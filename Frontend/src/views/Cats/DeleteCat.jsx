import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import BigButton from '../../components/BigButton';

function DeleteCat(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ gato, setgato ] = useState([]);

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

        const gato = await res.json();

        console.log(gato);

        if (res.ok) {
            navigate(`/admin`, { replace: true });
            // location.reload();
        }
    }

    useEffect( ()=>{
        const getGato = async() =>{
            const endpoint = await import.meta.env.VITE_GET_CAT_EDIT+id;

            const res = await fetch(endpoint);

            const gato = await res.json();

            setgato(gato.data);   
        }
        
        getGato();
        }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <h1 className="font-bold text-xl text-center">¿Estas seguro de eliminar la raza {gato.name}?</h1>

                <div className="flex justify-center mt-3">
                    <div className="w-1/3">
                        <div className="flex justify-between">
                            <BigButton color="bg-green-500">
                                <Link to="/admin">Volver</Link>
                            </BigButton>

                           
                            <BigButton color="bg-red-600">
                                <p onClick={handleDelete}>Eliminar raza</p>
                            </BigButton>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCat