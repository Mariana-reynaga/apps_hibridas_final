import React from "react";
import { Link } from 'react-router-dom'

import H2Comp from './H2Comp';
import BigButton from './BigButton';

function AdminCard(props){
    return(
        <div className="p-4 flex flex-col items-center border rounded-md">
            <H2Comp>{props.title}</H2Comp>

            <div className="w-full mt-5 flex justify-evenly">
                <BigButton color="bg-sky-500/20" colorText="text-blue-900">
                    <Link to={props.add}>Agregar</Link>
                </BigButton>
                <BigButton color="bg-teal-600">
                    <Link to={props.destination}>Ir</Link>
                </BigButton>
            </div>
        </div>
    )
}

export default AdminCard;