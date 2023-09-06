import React from 'react'
import { useLocation, Link } from 'react-router-dom';

const LinkContainer = ({Icon, title, to}) => {
  const { pathname } = useLocation();

  return (
    <>
        <Link to={to} className="flex group items-center space-x-2">
        <div className={`w-[40%] transition-all group-hover:bg-primary/20 py-4 rounded-tr-full rounded-br-full flex justify-end pr-4 ${pathname === to ? "bg-primary/20" : ""}`}>
          <Icon className={`text-2xl group-hover:text-primary ${pathname === to ? "text-primary" : ""}`}/>
        </div>
        <span className={`font-medium text-gray-700 group-hover:text-primary text-xs ${pathname === to ? "text-primary" : ""}`}>
          {title}
        </span>
      </Link>
    </>
  )
}

export default LinkContainer