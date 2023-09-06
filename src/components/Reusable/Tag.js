import React from 'react'
import { ACTIVE, CANCELLED, CLOSED, CONFIRMED, DISABLED, GOLD, BASIC, PENDING, PLANTINUM, SHIPPED, SILVER, NOT_APPROVED } from '../../constants'
import {FaBitcoin,FaMedal} from 'react-icons/fa'
import {GiRibbonMedal} from 'react-icons/gi'
import {RiMedal2Fill} from 'react-icons/ri'
import {IoMedalOutline} from 'react-icons/io5'

const Tag = ({bg, text,custom_size }) => {
  return (
    <div>
        <div className={`text-xs  ${custom_size?  custom_size :"min-w-[90px] px-3 rounded-full"}   py-1 ${bg} text-white text-center uppercase`}>
            {text}
        </div>
    </div>
  )
}

export default Tag





export const StatusTag = ({status,custom_size})=>{
  return (
    
    status=== PENDING ?
        <Tag bg="bg-status-pending" text="Pending"/>
    :status=== CONFIRMED ?
        <Tag  bg="bg-status-confirmed" text="Confirmed"  />
    :status === SHIPPED ?
        <Tag bg="bg-status-shipped" text={"Shipped"} /> 
    :status === CANCELLED ?
        <Tag bg="bg-status-cancelled" text={"Cancelled"} />
    :status === CLOSED ?
        <Tag bg="bg-status-closed" text={"Closed"} />
    :
    (status === ACTIVE || status=== true ) ?
        <Tag bg="bg-green-500/70" text={"Active"} custom_size={custom_size} />  
    :status === DISABLED || status === false ?
        <Tag bg="bg-red-500/80" text={"Disabled"} custom_size={custom_size} />  
    :status === NOT_APPROVED ?
       <Tag bg="bg-status-not_approved" text={"pending"} custom_size={custom_size} />  
    :<p className='text-red-500'>{status}</p>
    
  )
}









