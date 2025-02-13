import React from 'react';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Text from '../../components/form/InputXadd';
import Error from '../../components/ErrorNotice';
import H1 from '../../components/H1Comp';

function Login(){
    const navigate = useNavigate();

    const [ userData, setuserData ] = useState({email: '', password: ''});
    const [loginStatus, setloginStatus] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;
        setuserData( { ...userData, [name]:value } );
    }

    const submit = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_LOGIN;

        const config = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);
        
        const data = await res.json();
        
        if (!res.ok) {
            setloginStatus(data.msg);
            return
        }
        
        navigate(`/`, { replace: true });
        location.reload();
    }

    return(
        <div className='flex flex-col items-center'>
            <div className="w-1/3">
                <H1>Iniciar sesión</H1>

                <div className="mt-8 p-4 border rounded-md">
                    <Error>{ loginStatus }</Error>
        
                    <form onSubmit={submit}>
                        <div className="flex flex-col">
                            <Text name="email" type="email" label="Email" function={handleInput} />
                        </div>

                        <div className="mt-5 flex flex-col">
                            <Text name="password" type="password" label="Contraseña" function={handleInput} />
                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Login</button>
                    </form>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link to="/register" className='text-teal-800 font-semibold underline underline-offset-2'>¿No tenés cuenta todavía? ¡Registrate!</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;