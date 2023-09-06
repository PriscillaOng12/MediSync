import { DateTime } from 'luxon';
import React from 'react'
import TimeField from 'react-simple-timefield';
import TimePicker from 'react-time-picker';

const index = ({form,field,label_text}) => {
    
    // const timeChangeHandler=(e,value)=>{
    //     console.log("values",DateTime.fromISO(e.target.value).toMillis())
    //     form.setFieldValue('time', e.target.value )
    // }
    const timeChangeHandler = (e, value) => {
        form.setFieldValue('time', e)
      }

  return (
    <div className='w-full '>
        {/* <label
        htmlFor={field}
        className={"label font-bold text-xs"}
        >
            {label_text}
        </label>
        <TimeField
            onChange={(e, value) =>timeChangeHandler(e,value)}  
            colon=":"   
            value={form.values[field]}                       
            showSeconds   
            className={`input disabled:cursor-not-allowed inputFocusAnimation rounded-lg input-text ${form.touched[field] && form.errors[field] ? "error-field" : ""} ${form.values[field] && form.values[field].toString().length > 0 && "active-input"}`}
            style={{
                width:"100%",
                outline:"none"
            }}                     // {Boolean}  default: false
        /> */}
         <div className=''>
      <label htmlFor={field} className={"label font-bold text-xs"} >
        {label_text}
      </label>
      <div className='mt-2 '>
        <TimePicker
          onChange={(e, value) => timeChangeHandler(e, value)}
          value={form.values[field]} 
          format="h:mm a" // Use 'a' for AM/PM
          className="inputFocusAnimation input-text"
        />
      </div>
    </div>
    </div>
  )
}

export default index