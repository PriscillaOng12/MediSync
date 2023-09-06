import React, {useRef} from 'react'
import {ErrorMessage} from "formik";

const FileField = ({form, field, label_text, password, isDisabled}) => {
    const input_ref = useRef(null)
    
    return (
        <>
            <div>
                <div className={`relative block w-full group`}>
                    <input ref={input_ref} type="file" />
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

export default FileField