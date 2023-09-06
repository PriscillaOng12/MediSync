import React from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import { Calendar, DateRangePicker } from "react-date-range";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DateTime } from "luxon";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DATE_FORMAT_DISPLAY, DATE_FORMAT_SERVER } from "../../../constants";

const DateFilter = ({ label_text, setState, state, minDate }) => {
  const [show, setShow] = useState(false);

  const ref = useDetectClickOutside({ onTriggered: () => setShow(false) });

  const handleChange = (value) => {
    setState(DateTime.fromJSDate(value).toFormat(DATE_FORMAT_SERVER));
    setShow(false);
  };

  return (
    <>
      <label className="text-xs block text-gray-500">{label_text}</label>
      <div className="relative block w-full group" ref={ref}>
        {show && (
          <Calendar
            color="#4c0788"
            className="absolute top-0 left-0 z-10 shadow-xl"
            onChange={handleChange}
            date={new Date()}
            minDate={minDate}
          />
        )}
        <input
          readOnly
          type="text"
          className={`input input-text`}
          onFocus={() => setShow(true)}
          value={state && DateTime.fromISO(state).toFormat(DATE_FORMAT_DISPLAY)}
        />
      </div>
    </>
  );
};

export default DateFilter;
