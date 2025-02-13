import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import BigButton from '../../components/BigButton';
import Back from '../../components/utility/BackBtn';
import H1 from '../../components/H1Comp';

function GatosAdmin(){
    const [ gatos, setgatos] = useState([]);

    useEffect( ()=>{
            const getCats = async()=>{
                const endpoint = import.meta.env.VITE_CATS;
    
                const res = await fetch(endpoint);
    
                const gatos = await res.json();
    
                setgatos(gatos.data);
            };
    
            getCats();
    }, []);
    
    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="p-2 border rounded-md">
                    <div className="pb-2 mb-2 flex justify-between items-center border-b">
                        <div className="w-1/6 flex justify-between items-center">
                            <Back destination="/admin" />
                            <H1>Gatos</H1>
                        </div>
                        
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
    )
}

export default GatosAdmin;