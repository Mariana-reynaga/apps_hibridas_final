import React from 'react';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

function Details(){
    const { id } = useParams();

    const [detalle, setDetalle] = useState([]);

    useEffect( ()=>{
        const getGato = async() =>{
            const endpoint = await import.meta.env.VITE_GET_CAT+id;

            const res = await fetch(endpoint);

            const detalle = await res.json();
            
            setDetalle(detalle.data);
        }
        getGato();
    }, []);

    return(
        <>
            <div className="">
                <h1>Pagina de detalles de "{ detalle.name }"</h1>

                <p>{ detalle.name } es una raza {detalle.status}</p>
            </div>
        </>
    )
}

export default Details;