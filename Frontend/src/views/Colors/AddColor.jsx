import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '../../components/form/InputXadd';
import Back from '../../components/utility/BackBtn';
import Error from '../../components/ErrorNotice';
import H1 from '../../components/H1Comp';

function AddColor (){
    const navigate = useNavigate();

    const [colorData, setcolorData] = useState({name: ''});
    const [creationStatus, setcreationStatus] = useState('');

    const handleInput = (e) =>{
        const {name, value} = e.target;
        setcolorData( { ...colorData, [name]:value } );
    }

    const crear = async(e) =>{
        e.preventDefault();

        const endpoint = import.meta.env.VITE_COLORS;
        
        const config = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(colorData),
            credentials: 'include'
        }

        const res = await fetch(endpoint, config);

        const data = await res.json();
        
        if (!res.ok) {
            setcreationStatus(data.msg);
            return
        }
    
        navigate(`/colors`, { replace: true });
    }

    return(
        <div className='flex flex-col items-center'>
            <div className="w-4/5">
                <div className="mt-10 flex items-center">
                    <Back destination="/admin" />
                    <H1>Añadir Color</H1>
                </div>

                <div className="mt-5">

                    {/* Mensaje de error */}
                    <Error>{creationStatus}</Error>
                    
                    <form onSubmit={crear}>
                        <div className="flex flex-col">
                            <Text name="name" type="text" label="Nombre del color" function={handleInput} />
                        </div>

                        <button type='submit' className='mt-5 px-6 py-2 border'>Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddColor;