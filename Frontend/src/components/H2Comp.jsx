import React from "react";

function H2Comp(props){
    return(
        <h2 className={`${props.margin} text-xl font-semibold`}>{ props.children }</h2>
    )
}

export default H2Comp;