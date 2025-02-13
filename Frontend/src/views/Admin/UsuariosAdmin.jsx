import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import BigButton from '../../components/BigButton';
import Back from '../../components/utility/BackBtn';
import H1 from '../../components/H1Comp';

function UsuariosAdmin(){
    const [ users, setusers ] = useState([]);
    
    useEffect( ()=>{
        const getUsers = async()=>{
            const endpoint = import.meta.env.VITE_USERS;
            
            const config = {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            }

            const res = await fetch(endpoint, config);

            const users = await res.json();

            setusers(users.users);
        }
        getUsers();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="p-2 border rounded-md">
                    <div className="pb-2 mb-2 border-b">
                        <div className="w-1/6 flex justify-between items-center">
                            <Back destination="/admin" />
                            <H1>Usuarios</H1>
                        </div>
                    </div>
                    
                    {
                        users.length === 0 ? (
                            <></>
                        ) : (
                            <div className="flex justify-center">
                                <table className='table-fixed w-[90%]'>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Creado</th>
                                            <th>Rol</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            users.map( (usuario)=>(
                                            <tr key={usuario._id}>
                                                <td>{usuario.name}</td>
                                                <td>{usuario.email}</td>
                                                <td>{new Date(usuario.created_at).toLocaleDateString('es-AR')}</td>
                                                <td>{usuario.role}</td>
                                                {
                                                    usuario.role === 'user' ? (
                                                        <td>
                                                            <BigButton color="bg-sky-500/20" colorText="text-blue-900">
                                                                <Link to={`/makeAdmin/${usuario._id}`} >Promover</Link>
                                                            </BigButton>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <BigButton color="bg-red-600" colorText="text-slate-50">
                                                                <Link to={`/demoteAdmin/${usuario._id}`} >Bajar</Link>
                                                            </BigButton>
                                                        </td>
                                                    )
                                                }
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


export default UsuariosAdmin;