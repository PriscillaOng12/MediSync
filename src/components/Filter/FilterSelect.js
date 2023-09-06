import React from 'react'
import Select from "react-select";
import { selectStylesFilter } from '../../utils';

const FilterSelect = ({label_text, options, state, setState, isDisabled,isMulti,placeholder}) => {
    const handleChange=(value)=>{
        console.log("value",value)
        if(!value){
            setState("")
        }else{
            setState(value)
        }     
    }
    return (
        <div>
            <span className="text-xs  block text-gray-500">
                {label_text}
            </span>
            <Select
                isDisabled={isDisabled}
                // styles={selectStylesFilter(false)}
                options={options}
                onChange={value => handleChange(value)}
                value={state}
                isMulti={isMulti}
                isClearable={true}
                placeholder={placeholder?placeholder:""}
            />
        </div>
    )
}

export default FilterSelect