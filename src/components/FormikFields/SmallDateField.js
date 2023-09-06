import React, { useState } from 'react'
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateTime} from "luxon";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { DATE_FORMAT_SERVER, DATE_FORMAT_DISPLAY } from '../../constants';
import { ErrorMessage } from 'formik';

const SmallDateField = ({ form, field, label_text }) => {

    const [show, setShow] = useState(false);

    // close calender if clicked outside calender
    const ref = useDetectClickOutside({ onTriggered: () => setShow(false) });
    
    const handleChange = (value) => {
        // reset end date if we are setting start date
        form.setFieldValue(field, DateTime.fromJSDate(value).toFormat(DATE_FORMAT_SERVER, DATE_FORMAT_DISPLAY))
        setShow(false);
    }

    return (
        <>
            <div>
                <div className="relative block w-full group" ref={ref}>
                    {show && 
                        <Calendar
                            color="#40e0d0"
                            className="absolute top-0 left-0 z-10 shadow-xl"
                            onChange={handleChange}
                            date={form.values[field] ? DateTime.fromISO(form.values[field]).toJSDate() : new Date()}
                            // minDate={minDate}
                        />
                    }
                    <label className="text-xs  block text-gray-500">
                    {label_text}
                    </label>
                    <input
                        readOnly
                        type="text"
                        name={field}
                        id={field}
                        className={`filter-input ${form.touched[field] && form.errors[field] ? "error-field" : ""} ${form.values[field].length > 0 && "active-input"}`}
                        onFocus={() => setShow(true)}
                        value={form.values[field] ? DateTime.fromISO(form.values[field]).toFormat(DATE_FORMAT_DISPLAY) : form.values[field]}
                    />

                </div>
                <p className="text-xs text-red-500">
                    <ErrorMessage name={field} />
                </p>
            </div>
        </>
    )
}

export default SmallDateField