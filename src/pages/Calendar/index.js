import React, {useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Page from '../../components/Page';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Axios } from '../../api';
import axios from 'axios';
import Loading from '../../components/Loading';
import { DateTime } from 'luxon';
import AddAppointment from './AddAppointment';
import FormContainer from './EventDetails/SymptomEvent';
import MedicationContainer from './EventDetails/MedicationDetails';
import { APPOINTMENT, APPOINTMENT_COLOR, MEDICATION, MEDICATION_COLOR, POPUP_MEDIUM, SYMPTOM, SYMPTOM_COLOR } from '../../constants';
import { useContext } from 'react';
import { BasePopupContext } from '../../components/BasePopup';
import AppointmentDetails from './EventDetails/AppointmentDetails';
import GoogleAuthButton from './SynceWithGoogle';

const localizer = momentLocalizer(moment);


const Calender = () => {
  const { setPopup } = useContext(BasePopupContext)

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // const events = [
  //   {
  //     title: 'Symptom',
  //     start: new Date(2023, 7, 23), // August 23, 2023, 10:00 AM
  //     end: new Date(2023, 7, 23),   // August 23, 2023, 12:00 PM
  //     name: "zain",
  //     type: SYMPTOM
  //   },
  //   {
  //     title: 'Appointment',
  //     start: new Date(2023, 7, 23), // August 23, 2023, 10:00 AM
  //     end: new Date(2023, 7, 23),   // August 23, 2023, 12:00 PM
  //     name: "zain",
  //     type: APPOINTMENT
  //   },
  //   {
  //     title: 'Medication',
  //     start: new Date(2023, 7, 23), // August 23, 2023, 10:00 AM
  //     end: new Date(2023, 7, 23),   // August 23, 2023, 12:00 PM
  //     name: "zain",
  //     type: MEDICATION
  //   }
  //   // Add more events here...
  // ];

  const selectedSlotStyle = {
    backgroundColor: 'lightblue',
    border: '1px solid blue',
  };


  const getEvents = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await Axios.get(`api/calendar/`, { requestId: "getting-events", });
      result.data.payload.map((item) => (
        item.symptoms.map(symptom => {
          const dateTimeString = `${symptom.date}T${symptom.time}`;
          const startDateTime = DateTime.fromISO(dateTimeString);

          data.push({
            ...symptom,
            title: symptom.title,
            start: startDateTime.toJSDate(),
            end: startDateTime.toJSDate(),
            event_type: SYMPTOM // Add a property to distinguish between appointment and symptom events
          })
        }),
        item.appointment.map(appointment => {
          const luxonDateTime = DateTime.fromISO(appointment.date, { setZone: true });
          const jsDate = luxonDateTime.toJSDate();

          data.push({
            ...appointment,
            title: appointment.title,
            start: jsDate,
            end: jsDate,
            // remainder: appointment.remainder
            event_type: APPOINTMENT // Add a property to distinguish between appointment and symptom events
          })
        }),
        item.medicine.map(item2 => {
          let medicine = item2.medicine
          const luxonDateTime = DateTime.fromISO(item.date, { setZone: true });
          const jsDate = luxonDateTime.toJSDate();

          data.push({
            title: medicine.name,
            start: jsDate,
            end: jsDate,
            event_type: MEDICATION, // Add a property to distinguish between appointment and symptom events
            ...medicine,
          })
        })
      ))
      setLoading(false)
    } catch (e) {
      if (e.response) {
        setError(JSON.stringify(e.response.data.description));
      }
      if (axios.isCancel) {
      } else {
        setError("Network Error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [refresh]);

  const slotPropGetter = (date) => {
    // Add custom styles to selected slot
    if (selectedSlot) {
      return {
        style: selectedSlotStyle,
      };
    }
    return {};
  };

  const eventPropGetter = (event) => ({
    style: {
      backgroundColor: eventColors[event.event_type],
    }
  });

  const eventColors = {
    symptom: SYMPTOM_COLOR, //red
    appointment: APPOINTMENT_COLOR,//primary color
    medication: MEDICATION_COLOR // yellow
  };

  const refreshListing = () => {
    setRefresh(!refresh)
  }

  const handleSelectEvent = (event) => {
    openPopup(event)
  }

  const openPopup = (event) => {
    let formattedDate;
    let formattedTime;
    if (event.event_type === APPOINTMENT) {

      const inputDateTime = event.date;

      // Parse the input date and time
      const parsedDateTime = DateTime.fromISO(inputDateTime);

      // Format the date and time separately
      formattedDate = parsedDateTime.toFormat('yyyy-MM-dd');
    }

    const popup = {
      hideDefaultClose: false,
      component: event.event_type === SYMPTOM ? <FormContainer data={event} />
        : event.event_type === MEDICATION ? <MedicationContainer data={event} />
          : event.event_type === APPOINTMENT ? <AppointmentDetails data={event} formattedDate={formattedDate}/> : "",
      visible: true,
      heading: `${event.event_type === SYMPTOM ? "Symptom" : event.event_type === MEDICATION ? "Medication" : event.event_type === APPOINTMENT ? "Appointment" : ""} Details`,
      contained: false,
      size: POPUP_MEDIUM,
      contained: true
    }
    setPopup(popup)
  }

  return (
    <Page >

      {loading && !error ? (
        <Loading />
      ) : !error && loading ? (
        <p className="text-center mt-5">{error}</p>
      ) : (
        <div className='relative rounded-md'>
          <div className="flex justify-between items-center pt-6 ">
            <div className=' '>
              <h1 className="heading-lg">Calendar</h1>
              <div className='flex space-x-4'>
                <div className='flex space-x-2 '>
                  <div className='w-3 h-3 rounded-full' style={{ background: SYMPTOM_COLOR }} ></div>
                  <span className='text-xs'>Symptom</span>
                </div>
                <div className='flex space-x-2 '>
                  <div className='w-3 h-3 rounded-full' style={{ background: MEDICATION_COLOR }} ></div>
                  <span className='text-xs'>Medication</span>
                </div>
                <div className='flex space-x-2 '>
                  <div className='w-3 h-3 rounded-full' style={{ background: APPOINTMENT_COLOR }} ></div>
                  <span className='text-xs'>Appointment</span>
                </div>
              </div>
            </div>
            <div className=" hidden sm:block">
              <AddAppointment refreshListing={refreshListing} />
            </div>
          </div>
          <div className="flex justify-end pb-2  block sm:hidden "><AddAppointment refreshListing={refreshListing} /></div>
          <div className='flex justify-end sm:justify-center py-4'>
            <GoogleAuthButton />
          </div>
          <div className=''>
            <Calendar
              localizer={localizer}
              events={data}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable={true} // Allow slot selection
              // onSelectSlot={handleSlotSelect} // Call the handleSlotSelect function on slot selection
              slotPropGetter={slotPropGetter} // Apply styles to selected slot
              views={['month', 'week', 'day']} // Only display the month and week views
              eventPropGetter={eventPropGetter}
              onSelectEvent={handleSelectEvent}

            />
          </div>
        </div>
      )}
    </Page>
  )
}

export default Calender