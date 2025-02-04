import React from 'react';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

function EditCat(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ detalle,    setDetalle ] = useState([]);
    const [ newData ,   setnewData ] = useState({name: '', origin: '', color:'', coat_length: '', status: '', img_url: ''});

    const [largos, setlargos] = useState([]);
    const [colores, setcolores] = useState([]);
    const [estados, setestados] = useState([]);

    const [editStatus, seteditStatus] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;
        setnewData( { ...newData, [name]:value } );
    }

    useEffect( ()=>{
            const getGato = async() =>{
                const endpoint = await import.meta.env.VITE_GET_CAT_EDIT+id;
    
                const res = await fetch(endpoint);
    
                const detalle = await res.json();
    
                setDetalle(detalle.data);

                setnewData({
                    name: detalle.data.name, 
                    origin: detalle.data.origin, 
                    color:detalle.data.color, 
                    coat_length: detalle.data.coat_length, 
                    status: detalle.data.status, 
                    img_url: detalle.data.img_url
                });       
            }
            
            const getLengths = async()=>{
                const endpoint = import.meta.env.VITE_LENGTH;

                const res = await fetch(endpoint);

                const largos = await res.json();

                setlargos(largos.data);
            }

            const getColores = async()=>{
                const endpoint = import.meta.env.VITE_COLORS;
    
                const res = await fetch(endpoint);
    
                const colores = await res.json();
    
                setcolores(colores.data);
                
                // console.log(colores.data);
            };

            const getStatus = async()=>{
                const endpoint = import.meta.env.VITE_STATUS;

                const res = await fetch(endpoint);

                const estados = await res.json();

                setestados(estados.data);
            }

            getLengths();
            getColores();
            getStatus();

            getGato();
    }, []);


    const editar = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_GET_CAT+id;

        console.log(endpoint);

        const config = {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData),
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const data = await res.json();
        
        console.log("la data = " , data.data);

        if (!res.ok) {
            seteditStatus(data.msg);
            return
        }
        
        navigate(`/cats`, { replace: true });
        location.reload();
    }

    return(
        <div className='flex flex-col items-center'>
            <div className="w-4/5">
                <div className="mt-10">
                    <h1>Editar {detalle.name}</h1>
                </div>

                <div className="mt-5">
                    <form onSubmit={editar}>
                        <h2 className='my-2'>{editStatus}</h2>

                        {/* Nombre */}
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text" 
                                id='name' 
                                name='name' 
                                className='border' 
                                value={newData.name || ''}
                                onChange={handleInput}
                            />
                        </div>

                        {/* Origen */}
                        <div className="mb-5 flex flex-col">
                            <label htmlFor="origin">Origen</label>
                            <input 
                                type="text" 
                                id='origin' 
                                name='origin' 
                                className='border' 
                                value={newData.origin || ''}
                                onChange={handleInput}
                            />
                        </div>

                        {/* Largo de pelo */}
                        <div className="flex mb-5 flex-col">
                            <label htmlFor="coat_length">Largo de pelo</label>
                            <select name="coat_length" id="coat_length" value={newData.coat_length} onChange={handleInput} >
                                <option value="">Elegir un largo de pelo</option>
                                {
                                    largos.map( (largo)=>(
                                        <option key={largo._id} value={largo._id}>{largo.name}</option>
                                    ))
                                }
                            </select>

                        </div>

                        {/* Color */}
                        <div className="flex mb-5 flex-col">
                            <label htmlFor="color">Color de pelo</label>
                            <select name="color" id="color" value={newData.color} onChange={handleInput} >
                                <option value="">Elegir un color</option>
                                {
                                    colores.map( (color)=>(
                                        <option key={color._id} value={color._id} >{color.name}</option>
                                    ))
                                }
                            </select>

                        </div>
                        
                        {/* Status */}
                        <div className="flex mb-5 flex-col">
                            <label htmlFor="status">Estado</label>
                            <select name="status" id="status" value={newData.status} onChange={handleInput} >
                                <option value="">Elegir un estado</option>
                                {
                                    estados.map( (status)=>(
                                        <option key={status._id} value={status._id} >{status.name}</option>
                                    ))
                                }
                            </select>

                        </div>

                        {/* Foto */}
                        <div className="flex mb-5 flex-col">
                            <label htmlFor="img_url">Foto</label>
                            <input 
                                type="text" 
                                id='img_url' 
                                name='img_url'
                                className='border'
                                value={ newData.img_url || '' }
                                onChange={handleInput} 
                            />

                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Editar</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default EditCat;