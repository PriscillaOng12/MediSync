import { DateTime } from 'luxon';
import React, { useState } from 'react'
import TimePicker from 'react-time-picker';

const TimeCustomField = ({ form, field, dosage, label_text }) => {
  const timeChangeHandler = (e, value) => {
    form.setFieldValue(field, e)
  }

  return (
    <div className=''>
      <label htmlFor={field} className={"label font-bold text-xs"} >
        {label_text}
      </label>
      <div className='mt-2 '>
        <TimePicker
          onChange={(e, value) => timeChangeHandler(e, value)}
          value={dosage.time}
          format="h:mm a" // Use 'a' for AM/PM
          className="inputFocusAnimation input-text"
        />
      </div>
    </div>
  )
}

export default TimeCustomField