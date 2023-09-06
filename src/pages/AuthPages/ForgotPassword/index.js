import React from 'react'
import Form from "./Form"
const Login = () => {
    return (
        <div className='h-full w-full lg:flex items-center justify-center bg-gradient-to-r bg-primary/10  '>
            <div className="w-full lg:w-8/12 h-full lg:h-[80vh] flex shadow-xl rounded-xl  bg-gray-100 ">
                <div className=' hidden lg:block lg:w-[50%] 2xl:w-[60%] rounded-tl-xl rounded-bl-xl' style={{
                    backgroundImage: "url('/images/forgot-password.svg')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                </div>


                <div className=" w-full lg:w-[50%] 2xl:w-[40%] px-4 2xl:py-8 ">
                    <h1 className="text-3xl text-center font-bold mt-6 mb-2">
                        Don't Worry
                    </h1>
                    <p className='text-xs pt-2 font-medium  mb-6 text-black/70'>Enter your email below and we'll send you an email to reset your password.</p>
                    <div className='pt-12 lg:pt-8 2xl:pt-12 '>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login