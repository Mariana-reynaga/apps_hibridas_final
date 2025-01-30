import React from 'react';

import { useState } from 'react';

function Login(){
    const [email, setemail] = useState('');

    const [password, setpassword] = useState('');

    const [loginStatus, setloginStatus] = useState('');

    const submit = async(e)=>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_LOGIN;

        const userData = {
            email: email,
            password: password
        };

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
        
        console.log("la data = " , data.data);

        if (!res.ok) {
            setloginStatus(data.msg);
            return
        }
        
        // redirigir al home
    }

    return(
        <div className='flex flex-col items-center'>
            <div className="w-4/5">
                <div className="mt-10">
                    <h1>Pagina de login</h1>
                </div>

                <div className="mt-5">
                    <h2>{ loginStatus }</h2>
    
                    <form onSubmit={submit}>
                        <div className="flex flex-col">
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

                        <button type='submit' className='mt-5 px-6 py-2 border'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;