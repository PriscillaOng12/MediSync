import React from 'react'
import PasswordUpdateForm from './PasswordUpdateForm';
import ProfileUpdateForm from "./ProfileUpdateForm";

const Profile = () => {
  return (
    <div className=''>
      <div>
        <h1 className="heading-lg">
          Personal Profile
        </h1>

      </div>
      {/* <p className="text-normal mb-5">
        Your Medical id is <span className='text-primary font-bold tracking-wider '>#1729B</span>
      </p> */}

      {/* <div className="grid grid-cols-2 gap-5"> */}
      <div className="mb-10">
        <ProfileUpdateForm/>
      </div>

      <p className="text-normal mb-5">
            Change your password here.
        </p>
        <PasswordUpdateForm/>

    </div>
  )
}

export default Profile