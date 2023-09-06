import React, { useContext } from 'react'
import FormContainer from './FormContainer'
import { BasePopupContext } from '../../components/BasePopup'
import { POPUP_LARGE, POPUP_MEDIUM } from '../../constants'

const AddButton = ({refreshListing}) => {
    const { setPopup } = useContext(BasePopupContext)


    const openPopup = () => {
        const popup = {
            hideDefaultClose: false,
            component: <FormContainer refreshListing={refreshListing} />,
            visible: true,
            heading: "Add Medication",
            contained: false,
            size: POPUP_LARGE,
            contained: true
        }
        setPopup(popup)
    }

    return (
        <div>
            <button onClick={()=> openPopup() }  className='block btn btn-md btn-primary'>
              Add Medication
            </button>
        </div>
    )
}

export default AddButton