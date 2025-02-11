import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import Back from '../../components/utility/BackBtn';
import BoldText from '../../components/BoldText';

function Details(){
    const { id } = useParams();

    const [ detalle, setDetalle ] = useState([]);

    const [checkAdmin, setcheckAdmin] = useState(false);

    useEffect( ()=>{
        const getGato = async() =>{
            const endpoint = await import.meta.env.VITE_GET_CAT+id;

            const res = await fetch(endpoint);

            const detalle = await res.json();

            setDetalle(detalle.data);
        }
        getGato();
    }, []);

    const adminCheck = async()=>{
        const endpoint = import.meta.env.VITE_ADMIN_CHECK;
  
        const config = {
          method: 'GET',
          headers:{
              'Content-type': 'application/json'
          },
          credentials: 'include'
      }
  
        const res = await fetch(endpoint, config);
  
        const adminCheck = await res.json();
  
        // console.log(adminCheck);
  
        if(res.ok){
          setcheckAdmin(true);
          // console.log("el user es admin = ", checkAdmin);
  
        }else{
          setcheckAdmin(false);
          // console.log("el user no es admin = ", checkAdmin);
        }
    }

    adminCheck();
    return(
        <div className="flex flex-col items-center">
            <div className="w-4/5">
                <div className="flex">
                    <Back destination="/cats" />
                    <h1 className='text-2xl font-semibold'>{ detalle.name }</h1>
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