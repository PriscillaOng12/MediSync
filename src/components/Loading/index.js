import React from 'react'
import {BiLoaderAlt} from "react-icons/bi";
import {motion} from "framer-motion";

const Loading = () => {
    return (
        <>
            <div className="py-12 w-10/12 mx-auto flex-shrink-0 ">
                <div className="w-11/12 text-center mx-auto">
                    <BiLoaderAlt className='mx-auto text-7xl text-primary animate-spin'/>
                </div>
            </div>
        </>
    )
}

export default Loading

export const FullScreenLoading = () => {
    return (
        <div className="loader-screen left-0 top-0 fixed h-screen w-screen bg-white flex items-center justify-center" style={{zIndex: 10000}}>
            <h2 className="animate-spin text-7xl text-green-secondary"><BiLoaderAlt /></h2>
        </div>
    )
} 

export const LogoLoading = () => {
    return (
        <div className="loader-screen left-0 top-0 fixed h-screen w-screen bg-white flex flex-col items-center justify-center" style={{zIndex: 10000}}>
            <motion.div 
            initial={{
                opacity: 0,
                top:"100px",
                scale: .4
            }}
            animate={{
                opacity: 1,
                top:0,
                scale: 1
            }}
            transition={{
                duration: .5
            }}
            className="relative flex flex-col items-center justify-center">
                <motion.img 
                src="/images/doctor_logo.svg" alt="ProID Logo" className='w-1/2 max-w-[500px] relative mx-auto block mb-12' />
                <h2 className=" text-5xl text-green-secondary">
                     MediSync
                </h2>
                    <BiLoaderAlt className='animate-spin mx-auto mt-6 text-4xl text-primary' />
            </motion.div>
        </div>
    )
}
