import React from "react";

function BigButton(props) {

    return(
        <div className={`w-1/3 px-2 py-2 flex justify-center ${props.color} rounded-md`}>
            {props.children}
        </div>
    )
}

export default BigButton;