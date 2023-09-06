import React from 'react'
import ReactTooltip from 'react-tooltip';

const IconButton = ({Icon, callback, tooltip, extraClass,size, type}) => {
  return (
    <>
    <button type={type?type:"submit"} data-tip={tooltip} className="focus:outline-none" onClick={callback}>
        <Icon className={`transition-transform ${size?size:"text-3xl"} transform ${extraClass ? extraClass : ""}`} />
        <ReactTooltip />
    </button>
    </>
  )
}

export default IconButton