import React from 'react'
import {Field, ErrorMessage} from "formik";
import Select from "react-select";
import { selectStyles } from '../../utils';

const SelectField = ({form, field, label_text,placeholder, options, notSearchable,isMulti, isDisabled,isClearable}) => {

    const handleChange = (value) => {
        form.setFieldValue(field, value);
    }
    return (
        <>
            <div>
                <div className={`relative block w-full group`}>
                <label className='text-xs font-bold'>
                    {label_text}
                </label>
                <Select
                    styles={selectStyles(form.touched[field] && form.errors[field])}
                    options={options}
                    value={form.values[field]}
                    onChange={handleChange}
                    className="flex-grow"
                    placeholder={placeholder?placeholder:label_text}
                    isDisabled={isDisabled}
                    isMulti={isMulti}
                    isClearable={isClearable}
                />
                <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
            </div>
            </div>
        </>
    )
}

export default SelectField