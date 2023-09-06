import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { BASE_URL, IMAGE_BASE_URL } from '../../../../constants';
import { useSelector } from 'react-redux';

const User = () => {
    const [image, setImage] = useState(false);
    const user = useSelector(state => state.user);

    return (
        <>
            {
                !image ?
                    <img class="w-12 h-12 rounded-full" src={user.image ? BASE_URL+"api"+user.image : "/images/doctor_logo.svg"} alt="" />

                    :
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary"
                    // style={{backgroundImage: `url("https://via.placeholder.com/500")`}}
                    // style={{backgroundImage: `url("https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")`}}
                    >
                        <FaUser className='text-xl text-white' />
                    </div>
                }
        </>
    )
}

export default User