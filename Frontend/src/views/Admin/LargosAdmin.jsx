import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import BigButton from '../../components/BigButton';
import Back from '../../components/utility/BackBtn';
import H1 from '../../components/H1Comp';

function LargosAdmin(){
    const [ largos, setlargos] = useState([]);

    useEffect( ()=>{
        const getLengths = async()=>{
            const endpoint = import.meta.env.VITE_LENGTH;

            const res = await fetch(endpoint);

            const largos = await res.json();

            setlargos(largos.data);
        }
        getLengths();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="p-2 border rounded-md">
                    <div className="pb-2 mb-2 flex justify-between items-center border-b">
                        <div className="w-1/6 flex justify-between items-center">
                            <Back destination="/admin" />
                            <H1>Largos</H1>
                        </div>

                        <Link to="/lengths/add" className="underline underline-offset-2">Agregar Largo</Link>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-4/5">
                            {
                                largos.map( (largo)=>(
                                    <div className="my-2 flex justify-between items-center" key={largo._id}>
                                        <p>{largo.name}</p>

                                        <BigButton color="bg-red-600" colorText="text-slate-50">
                                            <Link to={`/lengths/delete/${largo._id}`} >Eliminar</Link>
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

export default LargosAdmin;