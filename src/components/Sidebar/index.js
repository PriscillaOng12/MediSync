import React from 'react'
import Link from './Link';
import NestedLink from './NestedLink';
import { normalLinks } from '../../routes/NormalRoutes/normalLinks';
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {Axios} from '../../api/index';
import { error_alert, removeToken, success_alert } from '../../utils';
import { logout } from '../../redux/slices/userSlice';
import { ACCESS_TOKEN } from '../../constants';

const Sidebar = () => {
  const sidebar = useSelector(state => state.ui.sidebar);
  const dispatch = useDispatch()



  const handleLogout= async ()=>{
      // try{
      //     const result = await Axios.get("api/users/logout", {requestId: "logout"});
      //     removeToken();
      //     dispatch(logout())
      //     success_alert("You have been logout successfully!");
      // } catch(e){
      //     if(e.response){
      //         error_alert(JSON.stringify(e.response.data.description))
      //     } else{
      //         error_alert("Network Error!")
      //     }
      // }

    dispatch(logout())
    localStorage.removeItem(ACCESS_TOKEN)

  }
  

  return (
    <>
      <div className={`z-[101] transition-transform bg-white flex flex-col overflow-y-auto fixed top-0 bottom-0 w-[220px] pt-6 transform lg:translate-x-0 ${sidebar ? "translate-x-0" : "translate-x-[-100%]"}`}>
        <div className="flex-shrink-0">
          <img src="/images/doctor_logo.svg" alt="" className='mb-12 w-[140px] mx-auto' />
        </div>

        <div className="flex-grow space-y-2">
          {
            normalLinks.map((item, index) => (
              item.links ?
                <NestedLink title={item.title} Icon={item.icon} to={item.to} links={item.links} />
                :
                <Link title={item.title} Icon={item.icon} to={item.to} />

            ))
          }

        </div>

        <div className="flex-shrink-0 pb-12">
          <button className="w-full flex group items-center space-x-2" onClick={()=>handleLogout()}  >
            <div className={`w-[30%] transition-all group-hover:bg-primary/20  py-5 rounded-tr-full rounded-br-full flex justify-end pr-4`}>
              <IoLogOutOutline className={`transform scale-x-[-1] text-4xl group-hover:text-primary `} />
            </div>
            <span className={`opacity-1 font-medium text-gray-700 group-hover:text-primary text-sm `}>
              Logout
            </span>
          </button>

          <div className="flex justify-end mt-4">
            <p className="w-[89%] text-sm text-left text-gray-400">
              V 0.0.1
            </p>
          </div>

        </div>

      </div>
      {
        sidebar ?
          <div className="bg-black bg-opacity-25 fixed top-0 left-0 right-0 bottom-0 z-[100]"></div>
          : null
      }
    </>
  )
}

export default Sidebar