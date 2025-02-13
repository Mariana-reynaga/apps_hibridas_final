import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import Back from '../../components/utility/BackBtn';
import BoldText from '../../components/BoldText';
import H1 from '../../components/H1Comp';

function Details(){
    const { id } = useParams();

    const [ detalle, setDetalle ] = useState([]);

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
        <div className="flex flex-col items-center">
            <div className="w-4/5">
                <div className="flex items-center">
                    <Back destination="/cats" />
                    <H1>{ detalle.name }</H1>
                </div>

                <div className="mt-10 flex justify-evenly">
                    <div className="w-1/3 h-fit p-4 border rounded-md">
                        <ul className='list-none h-1/2 flex flex-col justify-evenly'>
                            <li> <BoldText text="Origen:" /> {detalle.origin}</li>
                            <li> <BoldText text="Color:" /> {detalle.color}</li>
                            <li> <BoldText text="Largo:" /> {detalle.coat_length}</li>
                            <li> <BoldText text="Estatus:" /> {detalle.status}</li>
                        </ul>
                    </div>

                    <div className="w-1/3">
                        <img src={detalle.img_url} className='rounded-md' />
                    </div>
                </div>

            </div>
        </div>        
    )
}

export default Details;