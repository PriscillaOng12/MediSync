import React from 'react'
import {Field, ErrorMessage} from "formik";

const CheckField = ({form, field, label_text}) => {
    return (
        <>
            <div className='w-full flex items-center'>
                <label
                    htmlFor={field}
                    className={"label text-xs font-bold"}
                >
                    {label_text}
                </label>
                <Field type="checkbox" className="w-6 h-4" name={field} />
                    
                <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
            </div>
        </>
    )
}

export default CheckField