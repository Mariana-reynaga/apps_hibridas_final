function InputXselect(props){
    let arrayOptions = [props.array];
    
    let data = props.pastData;

    return(
        <div className={`${props.margin} flex flex-col`}>
            <label htmlFor={props.name} className="font-medium" >{props.label}</label>

            <select name={props.name} id={props.name} onChange={props.function} value={data || ''} className='mt-2 p-2 border rounded-md' >
                <option value="">Elegir un {props.optionLabel}</option>
                {
                    arrayOptions[0].map( (option)=>(
                        <option key={option._id} value={option._id} >{option.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default InputXselect;