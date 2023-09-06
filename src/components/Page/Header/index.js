import React from 'react'
import Language from './Language'
import User from './User'
import Menu from './Menu'

const Header = ({title}) => {
  return (
    <div className='flex justify-between items-center py-4 px-4 mb-5'>
        <p className="text-base font-bold">
            {title}
        </p>
        
        <div className="flex items-center space-x-8">
            <Language/>
            <User/>
            <Menu/>
        </div>
    </div>
  )
}

export default Header