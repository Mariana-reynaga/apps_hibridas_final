import React from 'react';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import BigButton from '../components/BigButton';
import H2Comp from '../components/H2Comp';
import H1 from '../components/H1Comp';

function Admin(){
    const [ gatos, setgatos] = useState([]);
    const [ colorInfo, setcolorInfo ] = useState([]);
    const [ largos, setlargos] = useState([]);

    useEffect( ()=>{
        const getCats = async()=>{
            const endpoint = import.meta.env.VITE_CATS;

            const res = await fetch(endpoint);

            const gatos = await res.json();

            setgatos(gatos.data);
        };

        const getColors = async()=>{
            const endpoint = import.meta.env.VITE_COLORS;
    
            const res = await fetch(endpoint);

            const colorInfo = await res.json();

            setcolorInfo(colorInfo.data);
        }

        const getLengths = async()=>{
            const endpoint = import.meta.env.VITE_LENGTH;

            const res = await fetch(endpoint);

            const largos = await res.json();

            setlargos(largos.data);
        }

        getCats();
        getColors();
        getLengths();
    }, []);

    return(
        <>
            <div className="flex justify-center">
                <div className="w-4/5">
                    <H1>Administración</H1>

                    <div className="mt-5 grid grid-cols-2 gap-x-3">

                        {/* Colores */}
                        <div className="p-2 border rounded-md">
                            <div className="pb-2 mb-2 flex justify-between items-center border-b">
                                <H2Comp margin="ms-2">Colores</H2Comp>
                        
                                <Link to="/colors/add" className="underline underline-offset-2">Agregar Color</Link>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-4/5">
                                    {
                                        colorInfo.map( (color)=>(
                                            <div className="my-2 flex justify-between items-center" key={color._id}>
                                                <p>{color.name}</p>

                                                <BigButton color="bg-red-600" colorText="text-slate-50">
                                                    <Link to={`/colors/delete/${color._id}`} >Eliminar</Link>
                                                </BigButton>
                                            </div>
                                            
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        
                        {/* Largos */}
                        <div className="p-2 border rounded-md">
                            <div className="pb-2 mb-2 flex justify-between border-b">
                                <H2Comp margin="ms-2">Largos</H2Comp>

                                <Link to="/lengths/add" className="underline underline-offset-2">Agregar Largo</Link>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-4/5">
                                    {
                                        largos.map( (largo)=>(
                                            <div className="my-2 flex justify-between items-center" key={largo._id}>
                                                <p>{largo.name}</p>

                                                <BigButton color="bg-red-600" colorText="text-slate-50">
                                                    <Link to={`/lengths/delete/${largo._id}`} >Eliminar</Link>
                                                </BigButton>
                                            </div>
                                            
                                        ))
                                    }
                                </div>
                            </div>
                        </div> 
                    </div>
                    
                    {/* Gatos */}
                    <div className="mt-5">
                        <div className="p-2 border rounded-md">
                            <div className="pb-2 mb-2 flex justify-between border-b">
                                <H2Comp margin="ms-2">Gatos</H2Comp>
                                
                                <Link to="/cats/add" className="underline underline-offset-2">Agregar Gato</Link>
                            </div>
                            
                            {
                                gatos.length === 0 ? (
                                    <></>
                                ) : (
                                    <div className="flex justify-center">
                                        <table className='table-fixed w-[90%]'>
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Creado</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    gatos.map( (gato)=>(
                                                    <tr key={gato._id}>
                                                        <td>{gato.name}</td>
                                                        <td>{new Date(gato.created_at).toLocaleDateString('es-AR')}</td>
                                                        <td className='flex justify-evenly'>
                                                            <BigButton color="bg-sky-500/20" colorText="text-blue-900">
                                                                <Link to={`/cats/edit/${gato._id}`} >Editar</Link>
                                                            </BigButton>

                                                            <BigButton color="bg-red-600" colorText="text-slate-50">
                                                                <Link to={`/cats/delete/${gato._id}`} >Eliminar</Link>
                                                            </BigButton>
                                                        </td>
                                                    </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Admin;