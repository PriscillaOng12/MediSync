import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { SUPPORTED_IMAGES } from '../../constants';
import { Axios } from '../../api';
import { useIntl } from 'react-intl';
import { error_alert, getImage } from "../../utils";
import { BiLoaderAlt } from 'react-icons/bi';
import { FaTimes } from "react-icons/fa";
import { ErrorMessage } from 'formik';
import { MdImage } from "react-icons/md"

const ImageField = ({ form, field, label_text, extraClass, close }) => {
    const file_ref = useRef();
    const [loading, setLoading] = useState(false);
    const field_value = form.values[field]

    const handleImage = async (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            if (SUPPORTED_IMAGES.includes(file.type)) {
                try {
                    setLoading(true);
                    const formData = new FormData()
                    formData.append("file", file);
                    const result = await Axios.post("api/main/upload-image", formData, { headers: { 'content-type': 'multipart/form-data' }, requestId: "image-post" });
                    form.setTouched({ ...form.touched, [field]: true })
                    const obj = { ...field_value, file: result.data.payload.url }
                    form.setFieldValue(field, obj)
                    form.setFieldError(field, "")
                    console.log(form)
                    setLoading(false);
                    e.target.value = null
                } catch (e) {
                    if (e.response) {
                        error_alert(JSON.stringify(e.response.data.description))
                    } else {
                        error_alert("Network Error");
                    }
                    form.setTouched({ ...form.touched, [field]: true })
                    e.target.value = null;
                    setLoading(false)
                }
            } else {
                form.setTouched({ ...form.touched, [field]: true })
                form.setFieldError(field, "Unsupported file!")
                e.target.value = null;
            }
        } else {
            form.setTouched({ ...form.touched, [field]: true })
            form.setFieldValue(field, { ...field_value, file: "" });
            e.target.value = null
        }
    }

    return (
        <div className='w-full'>

            <div className="flex items-center justify-between  mb-2">
                <label
                    htmlFor={field}
                    className={"text-xs font-bold"}
                >
                    {label_text}
                </label>
                {
                    form.values[field].file ?
                        <p className="text-base ml-2 cursor-pointer" onClick={() => form.setFieldValue(field, {...form.values[field], file: ""})}>
                            <FaTimes />
                        </p>
                        :
                        null
                }
            </div>

            <div className={`${extraClass ? extraClass : "h-44 w-44 max-w-full"} bg-cover bg-center cursor-pointer flex justify-center items-center border-dashed border-2 ${form.touched[field] && form.errors[field] ? "border-red-500" : "border-gray-200"}`} style={{
                backgroundImage:
                    `url(${getImage(form.values[field].file)})`
            }}
                onClick={() => file_ref.current.click()}
            >
                {
                    !form.values[field].url && !form.values[field].file &&
                        <div className='space-y-2 flex justify-center items-center flex-col'>
                            {
                                loading ?
                                    <>
                                        <BiLoaderAlt className='animate-spin text-gray-200 text-5xl' />
                                        <p className="text-xs font-medium text-gray-400">
                                            Uploading...
                                        </p>
                                    </>
                                :
                                    <>
                                        <MdImage className='text-gray-200 text-5xl' />
                                        <p className="text-xs font-medium text-gray-400">
                                            <span className='text-primary font-bold'>Click here</span> to add an image
                                        </p>
                                    </>
                            }
                        </div>
                }

            </div>


            <input
                as="input"
                ref={file_ref}
                onChange={handleImage}
                type="file"
                name={field}
                id={field}
                className={`hidden`}
            // required
            />

            <p className="mt-1 text-xs text-red-500">
                {
                    form.touched[field] && form.errors[field] ?
                    form.errors[field]
                    :
                    null
                }
            </p>
        </div>
    )
}

export default ImageField