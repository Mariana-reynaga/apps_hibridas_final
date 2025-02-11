import React from "react";

function InputXadd(props) {
    let data = props.pastData;

    return(
        <div className={`${props.margin} flex flex-col`}>

            <label htmlFor={props.name} className="font-medium" >{props.label}</label>
            
            <input 
                name={props.name} 
                id={props.name} 
                type={props.type} 
                className='mt-2 p-2 border rounded-md' 
                onChange={props.function}
                value={ data || ''}
            />
        </div>
    )
}

export default InputXadd;