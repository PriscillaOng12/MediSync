import React, { useContext, useState } from 'react'
import FormContainer from '../FormContainer'
import { BASE_URL, POPUP_LARGE } from '../../../constants'
import { BasePopupContext } from '../../../components/BasePopup'
import Tag from '../../../components/Reusable/Tag'
import { DeleteIcon } from '../delete'
import { Axios } from '../../../api'
import { convertToAmPm, error_alert, isServerTimeGreaterThanOneHour, success_alert, warning_alert } from '../../../utils'
import axios from 'axios'
import { BiLoaderAlt } from 'react-icons/bi'
import ReactTooltip from 'react-tooltip';

const Card = ({ data, refreshListing }) => {
    const { setPopup } = useContext(BasePopupContext)

    const openPopup = (row) => {
        const popup = {
            hideDefaultClose: false,
            component: <FormContainer data={data} refreshListing={refreshListing} isUpdate={true} />,
            visible: true,
            heading: "Medication Details",
            contained: false,
            size: POPUP_LARGE,
            contained: true
        }
        setPopup(popup)
    }
    return (

        <div class="w-[340px] bg-white border border-gray-200 rounded-xl  ">
            <div style={{
                backgroundImage: `url(${BASE_URL + "api" + data.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} className='min-h-[200px] rounded-tl-xl rounded-tr-xl'>
            </div>
            <div class="p-5">
                <div className='text-sm'>
                    <h5 class="text-2xl font-bold tracking-tight ">{data.name}</h5>
                </div>
                <div className='text-sm'>
                    {data.medication_type_other ? data.medication_type_other : data.type}
                </div>
                <div className='space-x-1 text-sm'>
                    <span>{data.dosage_amount ? data.dosage_amount : ""}</span>
                    <span>{data.unit ? data.unit : ""}</span>
                </div>



                <p class="mb-3 font-normal tex-sm dark:text-gray-400 line-clamp-2 ">{data.instructions}.</p>
                <div className='py-2 grid grid-cols-3'>
                    {
                        data.medicine_dosage && data.medicine_dosage.length > 0 &&
                        data.medicine_dosage.map((item) => (
                            <Toogle
                                item={item}
                                refreshListing={refreshListing}
                            />
                        ))

                    }
                </div>

                <div className='flex justify-between items-center'>
                    <div onClick={openPopup} class="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:outline-none ">
                        Read more
                        <svg class="w-3.5 h-3.5 ml-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </div>
                    <DeleteIcon row={data} refreshListing={refreshListing} />
                </div>
            </div>
        </div>

    )
}

export default Card


const Toogle = ({item,refreshListing}) => {

    const [loading, setLoading] = useState(false);

    const handleMedication = async (e) => {
        setLoading(true)
        let x=isServerTimeGreaterThanOneHour(item.time)
        if(!x){
            setLoading(false)
            return warning_alert("Your are not allowed to take this dosage at the momemnt")
        }
        try {
            const result = await Axios.get(`api/medicine/dose-intake/${item.id}`, { requestId: "medicine-intake", });
            success_alert("Medication Taken Successfully")
            setLoading(false)
            refreshListing();
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else if (axios.isCancel) { }
            else {
                error_alert("Network Error");
            }
        }
        setLoading(false)
    };

    return (
        <div>
            <label>
                <div>{convertToAmPm(item.time)}</div>
            </label>
            {
                loading ?
                    <BiLoaderAlt className='text-lg text-primary animate-spin ' />
                    :
                    <div className='inline-flex space-x-2'>
                        <div>
                            <label data-tip={item.taken ? "Taken" :"Taken"} class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" checked={item.taken} class="sr-only peer"
                                       onChange={(e) => handleMedication(e)}
                                       disabled={item.taken}
                                />
                                <div class="w-11 h-6 bg-gray-200 border-[1px] rounded-full peer dark:bg-gray-50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                <ReactTooltip />
                            </label>
                        </div>

                    </div>
            }
        </div>
    )
}