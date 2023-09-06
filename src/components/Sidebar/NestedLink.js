import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import { BiCog } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const NestedLink = ({ Icon, title, to, links }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const hovered = links.find(item => item.to === pathname);
  return (
    <>
      <button type="button" onClick={() => setOpen(!open)} href="#" className="w-full block flex group items-center space-x-2">
        <div className={`w-[40%] transition-all group-hover:bg-primary/20  py-4 rounded-tr-full rounded-br-full flex justify-end pr-4 `}>
          <Icon className={`text-2xl group-hover:text-primary`} />
        </div>
        <span className={`font-medium text-gray-700 group-hover:text-primary text-xs ${hovered ? "text-primary" : ""}`}>
          {title}
        </span>
        <AiFillCaretDown className={`transition-all text-xs mt-1 group-hover:text-primary transform ${open ? "rotate-[180deg]" : "rotate=[0deg]"}`} />
      </button>
      <AnimatePresence>
        {
          open &&
          <motion.div
            initial={{ height: "0" }}
            animate={{ height: "auto" }}
            exit={{ height: "0" }}
            className="overflow-hidden"
          >
            {
              links.map((item, index) => (
                <Link key={index} to={item.to} className="flex group items-center space-x-2">
                  <div className={`w-[45%] transition-all group-hover:bg-primary/20  py-4 rounded-tr-full rounded-br-full flex justify-end pr-4 ${pathname === item.to ? "bg-primary/20" : ""}`}>
                    <item.icon className={`text-xl group-hover:text-primary ${pathname === item.to ? "text-primary" : ""}`} />
                  </div>
                  <span className={`font-medium text-gray-700 group-hover:text-primary text-xs ${pathname === to ? "text-primary" : ""}`}>
                    {item.title}
                  </span>
                </Link>
              ))
            }
          </motion.div>

        }
      </AnimatePresence>
    </>
  )
}

export default NestedLink