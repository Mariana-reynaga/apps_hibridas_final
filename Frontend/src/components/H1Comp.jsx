import React from "react";

function H1Comp(props){
    return(
        <h1 className={`${props.margin} text-2xl font-bold`}>{ props.children }</h1>
    )
}

export default H1Comp;