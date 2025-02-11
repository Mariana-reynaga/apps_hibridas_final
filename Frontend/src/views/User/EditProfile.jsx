import React from "react"

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Text from '../../components/form/InputXadd';
import Select from '../../components/form/InputXselect';
import Back from '../../components/utility/BackBtn';
import Error from '../../components/ErrorNotice';

function EditProfile(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ user, setuser ] = useState([]);
    const [ newData, setnewData ] = useState({ name: '', email: ''});

    const [editStatus, seteditStatus] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;
        setnewData( { ...newData, [name]:value } );
    }

    useEffect( ()=>{
        const getUser = async() =>{
            const endpoint = import.meta.env.VITE_USERS+id;

            const res = await fetch(endpoint);

            const user = await res.json();
            
            setuser(user.data);

            setnewData({
                name: user.data.name,
                email: user.data.email
            });
        }

        getUser();
    }, []);

    const edit = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_USERS+id;

        const config = {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData),
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        console.log(res);

        const data = await res.json();
        
        if (!res.ok) {
            seteditStatus(data.msg);
            return
        }
    
        navigate(`/profile/${id}`, { replace: true });
        // location.reload();
    }

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="mt-10 flex items-center">
                    <Back destination={`/profile/${id}`} />
                    <h1>Editar Perfil</h1>
                </div>

                <div className="mt-5">
                    <Error>{editStatus}</Error>

                    <form onSubmit={edit}>
                        <Text
                            margin="mb-3"
                            name="name" 
                            label="Nombre de usuario"
                            type="text"
                            function={handleInput}
                            pastData={newData.name}
                        />

                        <Text
                            margin="mb-3"
                            name="email" 
                            label="Email"
                            type="email"
                            function={handleInput}
                            pastData={newData.email}
                        />

                        <button type='submit' className='mt-5 px-6 py-2 border'>Guardar cambios</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;