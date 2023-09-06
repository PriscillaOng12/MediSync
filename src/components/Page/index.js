import React from 'react'
import { useSelector } from 'react-redux'
import Header from './Header'

const Page = ({children, title}) => {
  return (
    <div className={`lg:pl-[220px] w-full pb-8`}>
        <div className="w-[96%] max-w-[1600px] mx-auto">
        <Header title={title}/>
        <div className="px-4">
            {children}
        </div>
        </div>
    </div>
  )
}

export default Page