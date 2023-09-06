import React, { useState } from 'react'

const FilterSearch = ({ state, setState, label_text }) => {


    const handleChange = (e) => {
        setState(e.target.value)
    }

    return (
        <>
            <div>
                <div className="relative block w-full group">
                    <label
                        htmlFor={label_text}
                        className="text-xs block text-gray-500"
                    >
                        {label_text}
                    </label>
                    <input
                        type="text"
                        name={label_text}
                        id={label_text}
                        className={`filter-input ${state && "active-input"}`}
                        value={state}
                        onChange={handleChange}
                    />
                    
                </div>
            </div>
        </>
    )
}

export default FilterSearch