import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import BigButton from '../../components/BigButton';
import Back from '../../components/utility/BackBtn';
import H1 from '../../components/H1Comp';

function ColoresAdmin(){
    const [ colorInfo, setcolorInfo ] = useState([]);

    useEffect( ()=>{
            const getColors = async()=>{
                const endpoint = import.meta.env.VITE_COLORS;
        
                const res = await fetch(endpoint);
    
                const colorInfo = await res.json();
    
                setcolorInfo(colorInfo.data);
            }
            getColors();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="pb-2 mb-2 flex justify-between items-center border-b">
                    <div className="w-1/6 flex justify-between items-center">
                        <Back destination="/admin" />
                        <H1>Colores</H1>
                    </div>
            
                    <Link to="/colors/add" className="underline underline-offset-2">Agregar Color</Link>
                </div>

                <div className="p-2 border rounded-md">

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
            </div>
        </div>
    )
}

export default ColoresAdmin;