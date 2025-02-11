import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '../../components/form/InputXadd';
import Error from '../../components/ErrorNotice';

function Register(){
    const navigate = useNavigate();

    const [ userData, setuserData ] = useState({name: '', email: '', password: ''});

    const [registerStatus, setregisterStatus] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;
        setuserData( { ...userData, [name]:value } );
    }

    const submit = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_USERS;

        const config = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        }

        const res = await fetch(endpoint, config);

        const data = await res.json();
        
        console.log("la data = " , data.data);

        if (!res.ok) {
            setregisterStatus(data.msg);
            return
        }

        navigate(`/login`, { replace: true });
        location.reload();
    }

    return(
        <div className='flex flex-col items-center'>
            <div className="w-4/5">
                <div className="mt-10">
                    <h1>Registrarte</h1>
                </div>

                <div className="mt-5">
                    <Error>{ registerStatus }</Error>

                    <form onSubmit={submit}>
                        <div className="flex flex-col">
                            <Text name="name" type="text" label="Nombre" function={handleInput} />
                        </div>

                        <div className="mt-5 flex flex-col">
                            <Text name="email" type="email" label="Email" function={handleInput} />
                            
                        </div>

                        <div className="mt-5 flex flex-col">
                            <Text name="password" type="password" label="Contraseña" function={handleInput} />
                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;