import React from 'react'
import {Field, ErrorMessage} from "formik";

const TextField = ({form, field, label_text, password, isDisabled}) => {
    return (
        <>
        <div>
            <label className="text-xs  block text-gray-500">
            {label_text}
            </label>
            {/* <p className='break-all'>{record ? record : "-"}</p> */}
            <Field
                as={"input"}
                type={password ? "password" : "text"}
                name={field}
                id={field}
                disabled={isDisabled}
                className={`filter-input ${form.touched[field] && form.errors[field] ? "error-field" : ""} ${form.values[field] && form.values[field].toString().length > 0 && "active-input"}`}
            />
            <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
        </div>
        </>
    )
}

export default TextField