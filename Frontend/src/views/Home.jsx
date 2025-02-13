import React from 'react';
import { useState, useEffect} from 'react';

import CatCard from '../components/CatCard';
import Bold from '../components/BoldText';
import H1 from '../components/H1Comp';

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
            <div className="flex justify-center">
                <div className="w-4/5">
                    <div className="flex">
                        <div className="w-1/2 me-5 flex flex-col justify-center">
                            <H1>Michi Rest</H1>

                            <div className='h-3/4 flex flex-col justify-around'>
                                <p className='leading-6'>Michi REST permite la búsqueda, creación, actualización y eliminación de razas de gatos reconocidos por la Fédération Internationale Féline (FIF) además de razas experimentales.</p>
                                <p>Tambien, sin cargo extra, foto del gato de mi amigo: <Bold text="Argo" /></p>
                            </div>
                        </div>

                        <img src="argo.jpg" alt="" className='w-1/2 rounded-md' />
                    </div>
                </div>
            </div>

            <div className="mb-10 flex justify-center">
                <div className="w-4/5">
                    <div className="mt-10 flex justify-between">
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
                </div>
            </div>
        </>
    )
}

export default Home;