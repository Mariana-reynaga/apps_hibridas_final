import React from "react";
import { Link } from "react-router-dom";

function BackBtn(props){    
    return(
        <div className="px-3 py-2 me-5 bg-violet-500 rounded-md">
            <Link to={props.destination}>Atras</Link>   
        </div>
    )
}

export default BackBtn