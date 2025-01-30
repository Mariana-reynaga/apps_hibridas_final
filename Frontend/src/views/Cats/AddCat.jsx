import React from 'react';

import { useState, useEffect} from 'react';

function AddCat (){
    const [name, setName] = useState('');
    const [origin, setorigin] = useState('');
    const [color, setcolor] = useState('');
    const [coat, setcoat] = useState('');
    const [status, setstatus] = useState('');
    const [foto, setfoto] = useState('');
    
    const [colores, setcolores] = useState([]);
    const [largos, setlargos] = useState([]);
    const [estados, setestados] = useState([]);

    const [creationStatus, setcreationStatus] = useState('');

     useEffect( ()=>{
            const getColores = async()=>{
                const endpoint = import.meta.env.VITE_COLORS;
    
                const res = await fetch(endpoint);
    
                const colores = await res.json();
    
                setcolores(colores.data);
                
                // console.log(colores.data);
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

            const catData = {
                name: name,
                origin: origin,
                color: color,
                coat_length: coat,
                status: status,
                img_url: foto
            };

            const config = {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(catData),
                credentials: 'include'
            }

            const res = await fetch(endpoint, config);

            const data = await res.json();
            
            console.log("la data = " , data.data);

            if (!res.ok) {
                setcreationStatus(data.msg);
                return
            }
            
            // redirigir al home
        }

    return(
        <div className='flex flex-col items-center'>
        <div className="w-4/5">
            <div className="mt-10">
                <h1>Pagina de añadir gato</h1>
            </div>

            <div className="mt-5">

                <h2>{creationStatus}</h2>

                <form onSubmit={crear}>
                    {/* nombre */}
                    <div className="mb-5 flex flex-col">
                        <label htmlFor="name">nombre</label>
                        <input 
                            type="text" 
                            id='name' 
                            name='name' 
                            className='border' 
                            onChange={(e)=>{ setName(e.target.value)}} 
                        />

                    </div>

                    {/* origen */}
                    <div className="flex mb-5 flex-col">
                        <label htmlFor="origin">origen</label>
                        <input 
                            type="text" 
                            id='origin' 
                            name='origin' 
                            className='border' 
                            onChange={(e)=>{ setorigin(e.target.value)}} 
                        />

                    </div>

                    {/* Largo de pelo */}
                    <div className="flex mb-5 flex-col">
                        <label htmlFor="coat_length">Largo de pelo</label>
                        <select name="coat_length" id="coat_length" onChange={(e)=>{ setcoat(e.target.value)}} >
                            <option value="">Elegir un largo de pelo</option>
                            {
                                largos.map( (largo)=>(
                                    <option key={largo._id} value={largo._id} >{largo.name}</option>
                                ))
                            }
                        </select>

                    </div>
                            
                    {/* Color */}
                    <div className="flex mb-5 flex-col">
                        <label htmlFor="coat_length">Color de pelo</label>
                        <select name="coat_length" id="coat_length" onChange={(e)=>{ setcolor(e.target.value)}} >
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
                        <label htmlFor="coat_length">Estado</label>
                        <select name="coat_length" id="coat_length" onChange={(e)=>{ setstatus(e.target.value)}} >
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
                        <label htmlFor="foto">Foto</label>
                        <input 
                            type="text" 
                            id='foto' 
                            name='foto' 
                            className='border' 
                            onChange={(e)=>{ setfoto(e.target.value)}} 
                        />

                    </div>

                    <button type='submit' className='mt-5 px-6 py-2 border'>Crear</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default AddCat;