import React from 'react';

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import TextEdit from '../../components/form/InputEdit';
import Select from '../../components/form/SelectEdit';
import Back from '../../components/utility/BackBtn';
import Error from '../../components/ErrorNotice';
import H1 from '../../components/H1Comp';

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
        
        // console.log("la data = " , data.data);

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
                <div className="mt-10 flex items-center">
                    <Back destination="/admin" />
                    <H1>Editar "{detalle.name}"</H1>
                </div>

                <div className="mt-5">
                    <Error>{editStatus}</Error>

                    <form onSubmit={editar}>
                        <div className="flex justify-between">
                            <div className="w-1/2 me-3">
                                {/* Nombre */}
                                <TextEdit
                                    margin="mb-5" 
                                    name="name" 
                                    type="text" 
                                    label="Nombre" 
                                    function={handleInput}
                                    pastData={newData.name}
                                />

                                {/* Origen */}
                                <TextEdit
                                    margin="mb-5" 
                                    name="origin" 
                                    type="text" 
                                    label="Origen" 
                                    function={handleInput}
                                    pastData={newData.origin}
                                />

                                {/* Foto */}
                                <TextEdit
                                    margin="mb-5" 
                                    name="img_url" 
                                    type="text" 
                                    label="Foto" 
                                    function={handleInput}
                                    pastData={newData.img_url}
                                />

                            </div>

                            <div className="w-1/2 ms-3">
                                {/* Largo de pelo */}
                                <Select
                                    margin="mb-5" 
                                    name="coat_length" 
                                    label="Largo de pelo"
                                    function={handleInput}
                                    optionLabel="largo de pelo"
                                    array={largos}
                                    pastData={newData.coat_length}
                                />      
                                
                                {/* Color */}
                                <Select
                                    margin="mb-5" 
                                    name="color" 
                                    label="Color de pelo"
                                    function={handleInput}
                                    optionLabel="color"
                                    array={colores}
                                    pastData={newData.color}
                                /> 
                                
                                {/* Status */}
                                <Select
                                    margin="mb-5" 
                                    name="color" 
                                    label="Estado"
                                    function={handleInput}
                                    optionLabel="estado"
                                    array={estados}
                                    pastData={newData.status}
                                /> 
                            </div>
                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Editar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditCat;