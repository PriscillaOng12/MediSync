import React from 'react'
import {HiOutlineMenuAlt3} from "react-icons/hi";
import {ImCross} from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import {set_sidebar} from "../../../../redux/slices/uiSlice";


const Menu = () => {
    const sidebar = useSelector(state => state.ui.sidebar);
    const dispatch = useDispatch()

    return (
    <button className='lg:hidden focus:outline-none relative z-[101]' type="button" onClick={() => dispatch(set_sidebar(!sidebar))}>
        {
            sidebar ?
            <ImCross className='text-3xl text-white ' />
            :
            <HiOutlineMenuAlt3 className='text-3xl' />

        }
    </button>
  )
}

export default Menu