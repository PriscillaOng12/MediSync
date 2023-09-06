import React from 'react'
import Form from "./Form"
const Login = () => {
    return (
        <div className='h-full w-full lg:flex items-center justify-center bg-gradient-to-r bg-primary/10  '>
            <div className="w-full lg:w-8/12 h-full lg:h-[80vh] flex shadow-xl rounded-xl  bg-gray-100 ">
                <div className=' hidden lg:block lg:w-[50%] 2xl:w-[60%] rounded-tl-xl rounded-bl-xl' style={{
                    backgroundImage: "url('/images/login_logo.svg')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                </div>


                <div className=" w-full  lg:w-[50%] 2xl:w-[40%] px-4 lg:pr-8 2xl:py-8 ">
                    <h1 className="text-3xl text-center font-bold mt-6 mb-2">
                        Login to MediSync
                    </h1>
                    <p className='text-xs pt-2 font-medium  mb-4 text-black/70'>To keep connected with us please login with your email and Password</p>
                    <div className=''>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login