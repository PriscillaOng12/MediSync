import React, { useContext, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Axios } from '../../api';
import { BasePopupContext } from '../../components/BasePopup';
import { error_alert, hidePopup, success_alert } from '../../utils';
import {AiFillDelete} from  'react-icons/ai'
import { POPUP_MEDIUM } from '../../constants';

const Delete = ({data,refreshListing}) => {
  const [loading, setLoading] = useState(false);
  const {setPopup} = useContext(BasePopupContext);

  const handleSubmit = async () =>{
    setLoading(true)
    try{
      const result = await Axios.get(`api/medicine/delete/${data.id}`)
      setLoading(false)
      hidePopup(setPopup)
      success_alert(result.data.description)
      refreshListing()
    } catch(e){
      if(e.response){
        error_alert(JSON.stringify(e.response.data.description))
      } else{
        error_alert("Network Error");
      }
      setLoading(false)
    }
  }

  return (
    <>
      <p className="text-sm">
        Would you like to delete this Medication? 
      </p>

      <div className="flex items-center justify-end">
        <button onClick={handleSubmit} disabled={loading} type="button" className='btn btn-primary'>
          {
            loading ?
            <BiLoaderAlt className='animate-spin text-3xl'/>
            :
              `Yes, Delete`

          }
        </button>
      </div>
    </>
  )
}

export default Delete




export const DeleteIcon =({row,refreshListing})=>{

  const {setPopup} = useContext(BasePopupContext)

  const openPopup = () => {
      const popup = {
          hideDefaultClose: false,
          component: <Delete data={row} refreshListing={refreshListing} />,
          visible: true,
          heading: "Disclaimer",
          contained: false,
          size: POPUP_MEDIUM,
          contained: true
      }
      setPopup(popup)
  }

  return(
    <>
    <div>
      <AiFillDelete onClick={openPopup} className="text-red-500 text-2xl cursor-pointer"/>
    </div>
    
    </>
  )
}