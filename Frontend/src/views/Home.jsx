import React from 'react';
import { useState, useEffect} from 'react';

import CatCard from '../components/CatCard';

function Home(){
    const [randomCats, setrandomCats] = useState([]);

    useEffect( ()=>{
        const getRandom = async()=>{
            const endpoint = import.meta.env.VITE_RANDOM_CAT;

            const res = await fetch(endpoint);

            const randomCats = await res.json();

            setrandomCats(randomCats.data);
        }

        getRandom();
    }, [])

    return(
        <>
            <div className="mt-10">
                <h1>Michi Rest</h1>

                <div className="">
                    <p>Michi REST permite la búsqueda, creación, actualización y eliminación de razas de gatos reconocidos por la Fédération Internationale Féline (FIF) además de razas experimentales.</p>
                    <p>Tambien, sin cargo extra, foto del gato de mi amigo: <span>Argo</span></p>
                </div>
            </div>

            <div className="mt-10">
                {
                    randomCats.map( (gato)=>(
                        <CatCard
                            key={gato._id}
                            title={gato.name} 
                            img={gato.img_url}
                            alt={gato.alt} 
                            id={gato._id}
                        />
                     ) )
                }
            </div>
        </>
    )
}

export default Home;