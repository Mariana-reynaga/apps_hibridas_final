import React from 'react';

import { useState, useEffect} from 'react';
import CatCard from '../../components/CatCard';

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
        <>
            <div className="mt-10">
                <h1>Pagina de gatos</h1>
            </div>

            <div className="flex justify-center">
                <div className="w-4/5">
                    <div className="mt-10 grid grid-cols-3 gap-y-4">
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
        </>
    )
}

export default Cats;