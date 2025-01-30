import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [registerStatus, setregisterStatus] = useState('');

    const submit = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_REGISTER;

        const userData = {
            name: name,
            email: email,
            password: password
        };

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
                    <h1>Pagina de Registro</h1>
                </div>

                <div className="mt-5">
                    <h2>{ registerStatus }</h2>
    
                    <form onSubmit={submit}>
                        <div className="flex flex-col">
                            <label htmlFor="name">nombre</label>
                            <input 
                                type="text" 
                                id='name' 
                                name='name' 
                                className='border' 
                                onChange={(e)=>{ setname(e.target.value)}} 
                            />

                        </div>

                        <div className="mt-5 flex flex-col">
                            <label htmlFor="email">email</label>
                            <input 
                                type="email" 
                                id='email' 
                                name='email' 
                                className='border' 
                                onChange={(e)=>{ setemail(e.target.value)}} 
                            />

                        </div>

                        <div className="mt-5 flex flex-col">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                id='password' 
                                name='password' 
                                className='border'
                                onChange={(e)=>{ setpassword(e.target.value)}}
                            />
                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;