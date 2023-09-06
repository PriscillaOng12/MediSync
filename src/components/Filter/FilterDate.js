import React, { useState } from 'react'
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateTime} from "luxon";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { DATE_FORMAT_SERVER, DATE_FORMAT_DISPLAY } from '../../constants';

const DateField = ({ setStart,setEnd, isStartDate, state, minDate, label_text }) => {

    const [show, setShow] = useState(false);

    // close calender if clicked outside calender
    const ref = useDetectClickOutside({ onTriggered: () => setShow(false) });
    
    const handleChange = (value) => {
        // reset end date if we are setting start date
        if(isStartDate){
            setStart(DateTime.fromJSDate(value).toFormat(DATE_FORMAT_SERVER))
            setEnd("")
        } else{
            setEnd(DateTime.fromJSDate(value).toFormat(DATE_FORMAT_SERVER))
        }
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
                            date={state ? DateTime.fromISO(state).toJSDate() : new Date()}
                            minDate={minDate && DateTime.fromISO(minDate).toJSDate()}
                        />
                    }
                    <label
                        htmlFor={label_text}
                        className="text-xs block text-gray-500"
                    >
                        {label_text}
                    </label>
                    <input
                        readOnly
                        type="text"
                        name={label_text}
                        id={label_text}
                        className={`filter-input ${state && "active-input"}`}
                        onFocus={() => setShow(true)}
                        value={state ? DateTime.fromISO(state).toFormat(DATE_FORMAT_DISPLAY) : ""}
                    />
                    
                </div>
            </div>
        </>
    )
}

export default DateField