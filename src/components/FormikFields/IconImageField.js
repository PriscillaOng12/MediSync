import React, { useRef, useState } from 'react'
import {Field, ErrorMessage} from "formik";
import {AiOutlinePlus} from "react-icons/ai";
import { SUPPORTED_IMAGES } from '../../constants';
import { useEffect } from 'react';
import { error_alert } from '../../utils';
import { BiPencil, BiLoaderAlt } from 'react-icons/bi';
import { Axios } from '../../api';

const ImageField = ({form, field, custom_size, disabled}) => {
    const file_ref = useRef();
    useEffect(() => {
        console.log(form.values)
    }, [form.values[field]])

    const [loading, setLoading] = useState(false);


  return (
    <div className='w-full'>
        <div className="outline-none focus:outline-none transform h-[90px] w-[90px] transition-all mx-auto mb-4">
                <div className='relative w-full pt-[100%] bg-center bg-cover rounded-[23%] icon-image bg-white' style={{ backgroundImage: `url('${form.values[field] ? form.values[field] : "/images/icons/link.png"}')` }}>
                {
                    !disabled &&
                    <div onClick={() => {
                        if(!loading){
                            file_ref.current.click()
                        }
                    }} className="cursor-pointer z-[1] shadow-sm transform translate-x-[40%] translate-y-[-10%] h-7 w-7 rounded-full flex items-center justify-center bg-white absolute top-0 right-0">
                        {
                            loading ?
                                <BiLoaderAlt className="text-2xl animate-spin"/>
                            :
                                <BiPencil className='text-2xl'/>
    
                        }
                    </div>
                }
                </div>
        </div>
        <input
        as="input"
        ref={file_ref}
        onChange={async (e) => {
                const file = e.currentTarget.files[0];
                form.setTouched({...form.touched, [field]: true})
                if(file){
                    if(SUPPORTED_IMAGES.includes(file.type)){
                        // form.setFieldValue(field, form.values[field].url ? {...form.values[field], file: file} : {file: file})
                        setLoading(true)
                        try{
                            const formdata = new FormData()
                            formdata.append("file", file);
                            const result = await Axios.post("api/main/upload-image", formdata, {headers: {
                                "Content-Type": "multipart/form-data",
                            }})
                            form.setFieldValue(field, result.data.payload.url)
                            setLoading(false)
                            e.target.value = null;
                        } catch(e){
                            setLoading(false)
                            if(e.response){
                                error_alert(JSON.stringify(e.response.data.descriptoin))
                            } else{
                                error_alert("Network Error")
                            }
                            e.target.value = null;
                        }
                    } else{
                        error_alert("Please upload a valid image!")
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

    </div>
  )
}

export default ImageField