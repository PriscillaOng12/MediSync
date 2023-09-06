import React from 'react'
import { BasePopupContext } from '../../../components/BasePopup'
import { useContext } from 'react'
import { POPUP_MEDIUM } from '../../../constants'
import FormContainer from './FormContainer'

const AddAppointment = ({refreshListing}) => {
    const { setPopup } = useContext(BasePopupContext)


    const openPopup = () => {
        const popup = {
            hideDefaultClose: false,
            component: <FormContainer refreshListing={refreshListing} />,
            visible: true,
            heading: "Add Appointment Date",
            contained: false,
            size: POPUP_MEDIUM,
            contained: true
        }
        setPopup(popup)
    }

    return (
        <div className=' space-y-2'>
            <p>Have You scheduled an appointment?</p>
            <div className='flex justify-end'>
            <button onClick={()=> openPopup() }  className='block btn btn-md btn-primary'>
              Add Appointment Date
            </button>
            </div>
        </div>
    )
}

export default AddAppointment