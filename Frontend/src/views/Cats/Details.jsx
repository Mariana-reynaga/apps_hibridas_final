import React from 'react';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'

function Details(){
    const { id } = useParams();

    const [ detalle, setDetalle ] = useState([]);

    const [checkAdmin, setcheckAdmin] = useState(false);

    useEffect( ()=>{
        const getGato = async() =>{
            const endpoint = await import.meta.env.VITE_GET_CAT+id;

            const res = await fetch(endpoint);

            const detalle = await res.json();

            setDetalle(detalle.data)
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
        <>
            <div className="flex justify-center">
                <div className="w-4/5">
                    <div className="my-3">
                    {
                        checkAdmin == true ? (
                            <>
                                <p><Link to={`/cats/edit/${id}`} >Editar Gato</Link></p>
                                <p><Link to={`/cats/delete/${id}`} >Eliminar Gato</Link></p>
                            </>
                        ) : (
                            <></>
                        )
                    }
                    </div>

                    <h1>Pagina de detalles de "{ detalle.name }"</h1>

                    <p>{ detalle.name } es una raza {detalle.status}</p>
                    
                    <div className="w-1/5">
                        <img src={detalle.img_url} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details;