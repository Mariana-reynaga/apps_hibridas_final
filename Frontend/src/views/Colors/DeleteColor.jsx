import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import BigButton from '../../components/BigButton';

function DeleteColor(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ color, setcolor ] = useState([]);

    const handleDelete = async() =>{
        const endpoint = await import.meta.env.VITE_DELETE_COLOR+id;

        const config = {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'https://apps-hibridas-final.onrender.com'
            },
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const color = await res.json();

        if (res.ok) {
            navigate(`/colors`, { replace: true });
        }
    }

    useEffect( ()=>{
        const getColor = async() =>{
            const endpoint = await import.meta.env.VITE_COLOR+id;

            console.log(endpoint);

            const res = await fetch(endpoint);

            const color = await res.json();

            setcolor(color.data);

            // console.log(color.data);
        }
        
        getColor();
        }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <h1 className="font-bold text-xl text-center">¿Estas seguro de eliminar el color {color.name}?</h1>

                <div className="flex justify-center mt-3">
                    <div className="w-1/3">
                        <div className="flex justify-between">
                            <BigButton color="bg-green-500">
                                <Link to={`/admin`}>Volver</Link>
                            </BigButton>

                           
                            <BigButton color="bg-red-600">
                                <p onClick={handleDelete}>Eliminar color</p>
                            </BigButton>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteColor