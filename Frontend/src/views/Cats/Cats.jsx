import React from 'react';

import { useState, useEffect} from 'react';
import CatCard from '../../components/CatCard';
import H1 from '../../components/H1Comp';

function Cats(){
    const [cats, setcats] = useState([]);

    useEffect( ()=>{
        const getCats = async()=>{
            const endpoint = import.meta.env.VITE_CATS;

            const res = await fetch(endpoint);

            const cats = await res.json();

            setcats(cats.data);
        };

        getCats();
    }, []);

    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="">
                    <H1>Gatos</H1>
                    <p className='mt-2'>Tenemos una amplia colección de datos sobre todo tipo de razas de gatos, todos los detalles fueron aportados por nuestra comunidad.</p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-y-4">
                    {
                        cats.map( (gato)=>(
                            <CatCard
                                key={gato._id}
                                title={gato.name} 
                                img={gato.img_url}
                                alt={gato.alt} 
                                id={gato._id}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Cats;