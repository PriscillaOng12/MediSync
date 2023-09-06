import React from 'react'
import {Field, ErrorMessage} from "formik";

const TextareaField = ({form, field,placeholder, label_text, password,height, isDisabled, larger}) => {
    return (
        <>
            <div>
                <label htmlFor="fname" className={larger ? "text-sm" : "text-xs font-bold"}>{label_text}</label>
                <Field 
                    as={"textarea"}
                    type={password ? "password" : "text"}
                    name={field}
                    id={field}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    className={`resize-none inputFocusAnimation ${height? height:"h-[180px]"} ${larger ? "input-text-lg" : "input-text"} ${form.touched[field] && form.errors[field] ? "input-text-error" : ""} ${form.values[field] && form.values[field].toString().length > 0 && "input-text-active"}`}
                />
                <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
            </div>
        </>
    )
}

export default TextareaField