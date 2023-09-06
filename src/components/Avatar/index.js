import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, IMAGE_BASE_URL, SUPPORTED_IMAGES } from '../../constants';
import { error_alert, success_alert, warning_alert } from '../../utils';
import { Axios } from '../../api';
import { login } from '../../redux/slices/userSlice';
import { BiLoaderAlt } from 'react-icons/bi';

const Avatar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)


    const handleImage = async (e, form) => {
        const file = e.currentTarget.files[0];
        if (file) {
            if (SUPPORTED_IMAGES.includes(file.type)) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.addEventListener('load', () => {
                    const imageDataUrl = reader.result;
                    imageUpload(file,imageDataUrl);
                })

            } else {
                warning_alert("file not supported")
                e.target.value = null;
            }
        } else {
            e.target.value = null
        }
    }

    const imageUpload = async (file,imageDataUrl) => {
        setLoading(true)

        const formData=new FormData()
        formData.append("image", file)
        
        try {
                //construct url
                const result = await Axios.put(`api/users/image`, formData, { requestId: "update-image", });
                let obj = {
                    ...user,
                    image: result.data.payload.url
                }
                dispatch(login(obj))
                success_alert(result.data.description);
                setLoading(false)
            } catch (e) {
                if (e.response) {
                    error_alert(JSON.stringify(e.response.data.description))
                } else {
                    error_alert("Network Error!")
                }
            }
        
        setLoading(false)
    }
    return (
        <div class="mx-auto w-64 text-center ">
            <div class="relative w-64">
                <img class="w-64 h-64 rounded-full  " src={user.image ? BASE_URL +"api"+ user.image : "/images/doctor_logo.svg"} alt="" />

                <input id="file-upload" type="file"
                    onChange={(e) => handleImage(e)}
                    className={`hidden`} />
                <label for="file-upload" className={``}>
                    <div class="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute top-0 flex justify-center items-center cursor-pointer transition duration-500">
                        {
                            loading ?
                                <BiLoaderAlt className='text-primary text-3xl animate-spin' />
                                :
                                <img class="hidden group-hover:block w-12" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                        }
                    </div>

                </label>
            </div>
        </div>
    )
}

export default Avatar