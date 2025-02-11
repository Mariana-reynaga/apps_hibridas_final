import React from 'react';
import { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom'

import H2Comp from '../../components/H2Comp';
import BoldText from '../../components/BoldText';

function Profile(){
    const { id } = useParams();
    const [ userInfo, setuserInfo ] = useState({name: '', email: '', role: '', created_at: ''});

    useEffect( ()=>{
        const getInfo = async()=>{
            const endpoint = import.meta.env.VITE_USERS+id;

            const res = await fetch(endpoint);

            const userInfo = await res.json();
            
            const date = new Date(userInfo.data.created_at).toLocaleDateString('es-AR')

            setuserInfo({
                name: userInfo.data.name,
                email: userInfo.data.email,
                role: userInfo.data.role,
                created_at: date
            });

        }

        getInfo();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="flex justify-between">
                    <H2Comp>Bienvenido {userInfo.name}</H2Comp>
                    
                    <Link to={`/profile/edit/${id}`} className='underline underline-offset-8'>Editar Perfil</Link>
                </div>
            
                <div className="mt-5 p-2 flex justify-between border rounded-md">
                    <div className="w-1/2">
                        <div className=" mb-2 grid grid-cols-2">
                            <p><BoldText text="Email: " /></p>
                            <p>{userInfo.email}</p>
                        </div>

                        <div className="mt-2 grid grid-cols-2">
                            <p><BoldText text="Rol: " /></p>
                            <p>{userInfo.role}</p>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <div className="mb-2 grid grid-cols-2">
                            <p><BoldText text="Usuario desde: " /></p>
                            <p>{userInfo.created_at}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Profile;