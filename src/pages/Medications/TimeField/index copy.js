import { DateTime } from 'luxon';
import React from 'react'
import TimeField from 'react-simple-timefield';
import { formatTime12Hour } from '../../../utils';

const index = ({form,field,dosage,label_text}) => {
    // console.log("dosage",dosage)
    const timeChangeHandler=(e,value)=>{
        form.setFieldValue(field, e.target.value )
    }
    const timeValue24Hour = dosage.time;
    const timeValue12Hour = formatTime12Hour(timeValue24Hour);
  

  return (
    <div className='w-full '>
        <label
        htmlFor={field}
        className={"label font-bold text-xs"}
        >
            {label_text}
        </label>
        <TimeField
            onChange={(e, value) =>timeChangeHandler(e,value)}  
            colon=":"   
            value={timeValue12Hour}              
            showSeconds   
            className={`input disabled:cursor-not-allowed inputFocusAnimation rounded-lg input-text ${form.touched[field] && form.errors[field] ? "error-field" : ""} ${form.values[field] && form.values[field].toString().length > 0 && "active-input"}`}
            style={{
                width:"100%",
                outline:"none"
            }}                     // {Boolean}  default: false
        />
    </div>
  )
}

export default index