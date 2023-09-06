import React from 'react'
import {Field, ErrorMessage} from "formik";
import TagInput from 'react-taggables-input';
import 'react-taggables-input/dist/tags.css';


const TagField = ({form, field, label_text, extraInfor, isDisabled}) => {
    const handleChange = tag => {
        form.setFieldValue(field, tag);
    };

    return (
        <>
            <div className='w-full'>
                <div className='flex space-x-2 items-center'>
                <label
                    htmlFor={field}
                    className={"label text-xs font-bold"}

                >
                    {label_text} 
                </label>
                <span className='text-xs'>{" (Write Name & Press Enter) "}</span>
                </div>
                <div className={`my-tags ${form.touched[field] && form.errors[field] ? "my-tags-error" : ""} ${form.values[field] && form.values[field].length > 0 && "my-tags-active"}`}>
                    <TagInput value={form.values[field]} onChange={handleChange} onEnter={(tag) => true} />
                </div>
                    
                <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
            </div>
        </>
    )
}

export default TagField