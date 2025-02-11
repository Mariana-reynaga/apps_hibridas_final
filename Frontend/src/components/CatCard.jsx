import React from "react";
import { Link } from "react-router-dom";

import BigButton from "./BigButton";
import H2Comp from "./H2Comp";

function CatCard(props) {
    return(
        <div className="w-72 p-4 border rounded-md">
            <img src={ props.img } className="h-48 w-full"/>
            <div className="flex flex-col items-center justify-center">
                <H2Comp margin="my-4">{ props.title }</H2Comp>
            
                <BigButton color="bg-teal-600" >
                    <Link to={`/cats/${props.id}`} className="bg-primary px-6 py-2 rounded-lg">Detalles</Link>
                </BigButton>
            </div>
        </div>
    )
}

export default CatCard;