import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(){
    return(
        <div className="flex justify-center">
            <div className="w-4/5">
                <div className="flex flex-col items-center">
                    <h1 className='text-3xl font-bold text-teal-600'>No pudimos encontrar la página</h1>

                    <div className="mt-10">
                        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzFjbjF4d2RwM3A5YTdpejZnczh3OWx5MHppcHhwYzFjYWRoeHlzcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r7Y17m4862kdW/giphy.gif" className='rounded-md' />
                    </div>

                    <p className='mt-8 text-lg'>Algo ocurrio con el link que buscaste, <Link to="/" className="text-teal-600" >volver</Link></p>
                </div>

            </div>
        </div>
    )
}

export default NotFound;