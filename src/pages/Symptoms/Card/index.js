import React, { useContext } from 'react'
import { DeleteIcon } from '../delete'
import { DATE_FORMAT_DISPLAY, MILD_SEVERITY, MODERATE_SEVERITY, POPUP_LARGE, SEVERE_SEVERITY } from '../../../constants'
import { BasePopupContext } from '../../../components/BasePopup'
import FormContainer from '../FormContainer'
import { DateTime } from 'luxon'
import { convertToAmPm } from '../../../utils'

const Card = ({ data, refreshListing }) => {
    const { setPopup } = useContext(BasePopupContext)

    const openPopup = (row) => {
        const popup = {
            hideDefaultClose: false,
            component: <FormContainer data={data} refreshListing={refreshListing} isUpdate={true} />,
            visible: true,
            heading: "Symptom Details",
            contained: false,
            size: POPUP_LARGE,
            contained: true
        }
        setPopup(popup)
    }
    return (

        <div class="w-[340px] bg-white border border-gray-200 rounded-lg shadow ">
            <div class="p-5">
                <div className='text-sm mb-2'>
                    <h5 class="text-2xl font-bold tracking-tight line-clamp-1 ">{data.title}</h5>
                </div>
                <div className='text-sm flex justify-between space-x-3'>
                    <div className='flex space-x-2'>
                        <div className='text-gray-500'>Severity</div>
                        <div className={` capitalize  ${data.severity === SEVERE_SEVERITY?"text-red-500"
                        :data.severity === MODERATE_SEVERITY?"text-yellow-400"
                        :data.severity === MILD_SEVERITY?"text-green-500":""   } `}> {data.severity ? data.severity : data.severity}</div>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='text-gray-500'>Date</div>
                        <div> {data.severity ? DateTime.fromISO(data.date).toFormat(DATE_FORMAT_DISPLAY) : ""}</div>
                    </div>
                </div>

                <div className='text-sm flex justify-between space-x-3'>
                    <div className='flex space-x-2'>
                        <div className='text-gray-500'>Duration</div>
                        <div> {data.duration ? data.duration : data.duration}</div>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='text-gray-500'>Time</div>
                        <div> {data.time ? convertToAmPm(data.time) : data.time}</div>
                    </div>
                </div>


                <div className='py-4'>
                    <p class="mb-3 font-normal tex-sm line-clamp-2 ">{data.description}</p>
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