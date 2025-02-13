import React from "react";
import { Link } from "react-router-dom";

function BackBtn(props){    
    return(
        <div className="px-3 py-2 me-5 bg-sky-500/50 rounded-md">
            <Link to={props.destination}> <img src="/back-arrow.svg" className="w-7"/> </Link>   
        </div>
    )
}

export default BackBtn