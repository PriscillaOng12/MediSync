import React, { useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as yup from "yup";
import { error_alert, hidePopup, stringNotEmpty, success_alert } from '../../../utils';
import TextField from '../../../components/FormikFields/TextField';
import DateField from '../../../components/FormikFields/DateField';
import { BiLoaderAlt } from 'react-icons/bi';
import { Axios } from '../../../api';
import { useContext } from 'react';
import { BasePopupContext } from '../../../components/BasePopup';
import TimeField from '../../../components/FormikFields/TimeField';
import { DateTime } from 'luxon';

const FormContainer = ({ data, id , refreshListing,isUpdate}) => {

    const { setPopup } = useContext(BasePopupContext)


    let initialValues = {
        title:"",
        location:"",
        remainder_time:null,
        date:"",
        time:"00:00"
    }

    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)

    const validationSchema = yup.object({
        title: yup.string().required("Required"),
        location: yup.string().required("Required"),
        date: yup.string().required("Required"),
        remainder_time: yup.number().typeError("Please enter a valid number").required("Required"),
    })

    const handleSubmit = async (values, formikBag) => {
        console.log("values",values)
        const inputDateTime = DateTime.fromISO(`${values.date}T${values.time?values.time:"00:00"}`);
        const desiredFormat = 'yyyy-MM-dd\'T\'HH:mm:ss';
        const formattedDateTime = inputDateTime.toFormat(desiredFormat);

        let payload = {
            title:values.title,
            location:values.location,
            date: formattedDateTime,
            remainder: values.remainder_time
        }
        console.log(payload)
        try {
            let result = await Axios.post("api/calendar/appointment", payload, { requestId: "appointment-post" });
            success_alert("Symptom Booked successfully")
            hidePopup(setPopup)
            // refreshListing();
            window.location.reload()
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error!")
            }
        }
    }



    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    form => (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {
                                form => (
                                    <Form>
                                        <div className='space-y-3'>
                                            <div className="grid sm:grid-cols-3  items-center gap-5">

                                                <TextField
                                                    field={'title'}
                                                    placeholder={'title'}
                                                    label_text={<span>Title<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />
                                                <TextField
                                                    field={'location'}
                                                    placeholder={'location'}
                                                    label_text={<span>Location<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />
                                                <TextField
                                                    field={'remainder_time'}
                                                    placeholder={'reminder'}
                                                    label_text={<span>Reminder<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />

                                                <DateField
                                                    form={form}
                                                    field={'date'}
                                                    label_text={<span>Date<span className='text-red-500'>*</span></span>}
                                                    minDate={new Date()}
                                                />
                                                <div className='col-span-2'>
                                                <TimeField form={form} field={`time`} label_text={"Time"} />
                                                </div>
                                            </div>

                                            <div className="flex items-center pt-3 pb-3">
                                                <button type="button" onClick={form.handleSubmit} disabled={form.isSubmitting} className='block w-full btn btn-primary'>
                                                    {
                                                        form.isSubmitting ?
                                                            <BiLoaderAlt className="animate-spin text-primary text-3xl mx-auto" />
                                                            :
                                                            "Submit"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    )
                }
            </Formik>
        </div>
    )
}

export default FormContainer