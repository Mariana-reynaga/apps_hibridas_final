import React from 'react';

import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '../../components/form/InputXadd';
import Select from '../../components/form/InputXselect';
import Back from '../../components/utility/BackBtn';
import Error from '../../components/ErrorNotice';
import H1 from '../../components/H1Comp';

function AddCat (){
    const navigate = useNavigate();
    
    const [catData , setcatData] = useState({name: '', origin: '', color:'', coat_length: '', status: '', img_url: ''})

    const [largos, setlargos] = useState([]);
    const [colores, setcolores] = useState([]);
    const [estados, setestados] = useState([]);

    const [creationStatus, setcreationStatus] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;
        setcatData( { ...catData, [name]:value } );
    }

    useEffect( ()=>{
            const getColores = async()=>{
                const endpoint = import.meta.env.VITE_COLORS;
    
                const res = await fetch(endpoint);
    
                const colores = await res.json();
    
                setcolores(colores.data);
            };
            
            const getLengths = async()=>{
                const endpoint = import.meta.env.VITE_LENGTH;

                const res = await fetch(endpoint);

                const largos = await res.json();

                setlargos(largos.data);
            }

            const getStatus = async()=>{
                const endpoint = import.meta.env.VITE_STATUS;

                const res = await fetch(endpoint);

                const estados = await res.json();

                setestados(estados.data);
            }

            getColores();
            getLengths();
            getStatus();
        }, []);

    const crear = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_POST_CAT;

        const config = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'https://apps-hibridas-final.onrender.com'
            },
            body: JSON.stringify(catData),
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const data = await res.json();
        
        if (!res.ok) {
            setcreationStatus(data.msg);
            return
        }
    
        navigate(`/cats`, { replace: true });
        // location.reload();
    }

    return(
        <div className='flex flex-col items-center'>
            <div className="w-4/5">
                <div className="mt-10 flex items-center">
                    <Back destination="/admin" />
                    <H1>Añadir Gatos</H1>
                </div>

                <div className="mt-5">
                    <Error>{creationStatus}</Error>
                 
                    <form onSubmit={crear}>
                        <div className="flex justify-between">
                            <div className="w-1/2 me-3">
                                {/* nombre */}
                                <Text margin="mb-5" name="name" type="text" label="Nombre" function={handleInput} />

                                {/* origen */}
                                <Text margin="mb-5" name="origin" type="text" label="Origen" function={handleInput} />

                                {/* Foto */}
                                <Text name="img_url" type="text" label="Foto" function={handleInput} />
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
                                />
                                        
                                {/* Color */}
                                <Select 
                                    margin="mb-5" 
                                    name="color" 
                                    label="Color de pelo"
                                    function={handleInput}
                                    optionLabel="color"
                                    array={colores}
                                />
                                
                                {/* Status */}
                                <Select 
                                    margin="mb-5" 
                                    name="status" 
                                    label="Estado"
                                    function={handleInput}
                                    optionLabel="estado"
                                    array={estados}
                                />
                            </div>
                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCat;