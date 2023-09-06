import React from 'react'
import {Field, ErrorMessage} from "formik";

const TextFieldNested = ({form, field, label_text, password, isDisabled, error, active}) => {
    return (
        <>
            <div>
                <div className={`relative block w-full group`}>
                    <Field
                        as={"input"}
                        type={password ? "password" : "text"}
                        name={field}
                        id={field}
                        disabled={isDisabled}
                        className={`input ${error ? "error-field" : ""} ${active && "active-input"}`}
                        // required
                    />
                    <label
                        htmlFor={field}
                        className={"label"}
                    >
                        {label_text}
                    </label>
                </div>
                <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
            </div>
        </>
    )
}

export default TextFieldNested