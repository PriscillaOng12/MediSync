import React, { useRef, useState } from 'react'
import {Field, ErrorMessage} from "formik";
import {AiOutlinePlus} from "react-icons/ai";
import { SUPPORTED_IMAGES } from '../../constants';
import { useEffect } from 'react';

const ImageField = ({form, field, label_text, custom_size}) => {
    const file_ref = useRef();
    useEffect(() => {
        console.log(form.values)
    }, [form.values[field]])


  return (
    <div className='w-full'>
        <label
            htmlFor={field}
            className={"label"}
        >
            {label_text}
            {
                form.values[field] &&
                <span className='text-sm ml-1'>(Re-upload?)</span>
            }
        </label>
        <div onClick={() => file_ref.current.click()} style={{backgroundImage: form.values[field] ?  form.values[field].file ? `url(${URL.createObjectURL(form.values[field].file)})` : form.values[field].url ? `url(${form.values[field].url})` : "" : ""}}
        className={`cursor-pointer ${custom_size ? custom_size : "h-[120px] w-[120px]"} flex items-center justify-center border-2 ${form.values[field] ? "border-green-primary" : "border-gray-300"} ${form.errors[field] && form.touched[field] ? "border-red-500" : ""}`}>
            {!form.values[field] ? <AiOutlinePlus className={`text-7xl ${form.errors[field] && form.touched[field] ? "text-red-500" : "text-gray-300"}`}/> : null}
        </div>
        <input
        as="input"
        ref={file_ref}
        onChange={(e) => {
                const file = e.currentTarget.files[0];
                form.setTouched({...form.touched, [field]: true})
                if(file){
                    if(SUPPORTED_IMAGES.includes(file.type)){
                        form.setFieldValue(field, form.values[field].url ? {...form.values[field], file: file} : {file: file})
                    } else{
                        form.setFieldError(field, "Unsupported file!")
                        e.target.value = null;
                    }
                } else{
                    form.setFieldValue(field, form.values[field].url ? {...form.values[field], file: ""} : "");
                    e.target.value = null
                }
            }
        }
        type="file"
        name={field}
        id={field}
        className={`hidden`}
            // required
        />
            
        <p className="text-xs text-red-500">
            {form.errors[field] && form.touched[field] ? form.errors[field] : null}
        </p>
    </div>
  )
}

export default ImageField