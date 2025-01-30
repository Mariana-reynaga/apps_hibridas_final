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
            <div className="">
                <h1>Pagina de gatos</h1>
            </div>

            <div className="mt-10 flex">
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
        </>
    )
}

export default Cats;