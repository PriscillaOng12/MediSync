import React, { useEffect, useState } from 'react'
import { Form, Formik, FieldArray, Field } from 'formik'
import * as yup from "yup";
import { dataURItoBlob, error_alert, hidePopup, stringNotEmpty, success_alert, warning_alert } from '../../utils';
import TextField from '../../components/FormikFields/TextField';
import { AiFillDelete } from 'react-icons/ai';
import DateField from '../../components/FormikFields/DateField';
import { BiLoaderAlt } from 'react-icons/bi';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Axios } from '../../api';
import { useContext } from 'react';
import { BasePopupContext } from '../../components/BasePopup';
import TimeField from './TimeField';
import SelectField from '../../components/FormikFields/SelectField';
import { BASE_URL, DOSAGE_UNIT, FREQUENCY_LIST, IMAGE_URl, MEAL_OPTION, MEDICATION_TYPE, NOTIFCATION_TYPE, OTHER, OTHERS_FREQUENCY, SUPPORTED_IMAGES, WEEK_DAYS } from '../../constants';
import TextareaField from '../../components/FormikFields/TextareaField';

const FormContainer = ({ data, id, refreshListing, isUpdate }) => {

    const { setPopup } = useContext(BasePopupContext)
    const [image, setImage] = useState(data ? data.image : "")
    const [loading, setLoading] = useState(false)


    let initialValues = {
        name: data ? data.name : "",
        remainder_time: data ? data.remainder_time : "",
        forgot_remainder: data ? data.forgot_remainder : "",
        start_from: data ? data.start_from : "",
        quantity: data ? data.quantity : "",
        medicine_dosage: data ? data.medicine_dosage : [{ time: "00:00" }],

        medication_type: data ? { label: data.type, value: data.type } : "",
        dosage_unit: data ? { label: data.unit, value: data.unit } : "",
        meal: data ? { label: data.unit, value: data.unit } : "",
        dosage_amount: data ? data.dosage_amount : "",
        additional_notes: data ? data.additional_notes : "",
        instructions: data ? data.instructions : "",
        frequency: data ? FREQUENCY_LIST.find((item)=>item.value === data.frequency ) : "",
        reminders: data ? { label: data.reminders, value: data.reminders } : "",
        image: "",
        end_date: data ? data.end_to ? data.end_to : "" : "",
        medication_type_other: data ? data.medication_type_other : "",
        custom_frequency: data ? data.custom_frequency?JSON.parse(data.custom_frequency):"":""

    }

    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)

    const validationSchema = yup.object({
        name: yup.string().required("Required"),
        remainder_time: yup.number().typeError("Please enter a valid number").required("Required"),
        forgot_remainder: yup.number().typeError("Please enter a valid number").required("Required"),
        start_from: yup.string().required("Required"),
        end_date: yup.string().required("Required"),
        quantity: yup.number().typeError("Please enter a valid number").required("Required"),
        medicine_dosage: yup.array().min(1, "Please provide at least 1 combination."),
        medication_type: yup.object().nullable().required("Required"),
        dosage_unit: yup.object().nullable().required("Required"),
        meal: yup.object().nullable().required("Required"),
        dosage_amount: yup.number().typeError("Please enter a valid number").required("Required"),
        additional_notes: yup.string().required("Required"),
        instructions: yup.string().required("Required"),
        frequency: yup.object().nullable().required("Required"),
        reminders: yup.object().nullable().required("Required"),
    })

    const handleSubmit = async (values, formikBag) => {
        let arr = []
        let day=[]
        if(values.frequency&&values.frequency.value===OTHERS_FREQUENCY){
            if(values.custom_frequency.length<=0){
                return warning_alert("Please Choose custom frequency")
            }else{
                day=values.custom_frequency.map((item)=>(
                    item.value
                ))
                values.medicine_dosage.map((item2)=>{
                    let obj={ time: item2.time}
                    if (item2.id) {
                        return arr.push({...obj, id:item2.id })
                    }else{
                        return arr.push({...obj, id:item2.id })
                    }

                })
                    
            }
        }else{
            if(data){
                values.medicine_dosage.map((item) => {
                    if (item.id) {
                        return arr.push({ id: item.id, time: item.time })
                    }
                    return arr.push({ id: item.id, time: item.time })
                })
            }else{
                arr=values.medicine_dosage
            }
            
                
        }


        let payload = {
            name: values.name,
            remainder_time: values.remainder_time,
            forgot_remainder: values.forgot_remainder,
            start_from: values.start_from,
            quantity: values.quantity,
            unit: values.dosage_unit,
            meal: values.meal.value,
            additional_notes: values.meal.additional_notes,
            reminders: values.reminders.value,
            end_to: values.end_date ? values.end_date : null,
            additional_notes: values.additional_notes,
            reminders: values.reminders.value,
            type: values.medication_type && values.medication_type.value,
            dosage_amount: values.dosage_amount,
            instructions: values.instructions,
            frequency: values.frequency && values.frequency.value,
            medication_type_other: values.medication_type_other,
            unit: values.dosage_unit && values.dosage_unit.value,
            custom_frequency: values.custom_frequency&&values.custom_frequency.length>0? JSON.stringify(values.custom_frequency):"",
            days:day
        }
        console.log("arr",arr)
        payload = {
            ...payload,
            medicine_dosage:arr
            // medicine_dosage: data ? values.medicine_dosage.map((item) => {
            //     if (item.id) {
            //         return { id: item.id, time: item.time }
            //     }
            //     return { id: item.id, time: item.time }
            // })
            //     :
            //     values.medicine_dosage
        }

        if (image) {
            payload = {
                ...payload,
                image: image,
            }
        }

        try {
            if (isUpdate) {
                let result = await Axios.put(`api/medicine/${data.id}`, payload, { requestId: "medication-update" });
            } else {
                let result = await Axios.post("api/medicine/", payload, { requestId: "medication-post" });
            }
            success_alert("Medication added successfully")
            hidePopup(setPopup)
            refreshListing();
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error!")
            }
        }
    }

    const handleDelete = (form, Itemindex) => {
        form.setFieldValue('medicine_dosage', form.values.medicine_dosage.filter((item, index) => index != Itemindex))
    }

    const handleImage = async (e, form) => {
        const file = e.currentTarget.files[0];
        if (file) {
            if (SUPPORTED_IMAGES.includes(file.type)) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.addEventListener('load', () => {
                    imageUpload(reader.result);
                })

            } else {
                warning_alert("file not supported")
                setImage(false)
                form.setFieldError('image', "Unsupported file!")
                e.target.value = null;
                form.setFieldValue('image', null)
            }
        } else {
            setImage(false);
            form.setFieldValue('image', null)
            e.target.value = null
        }
    }

    const imageUpload = async (imageDataURI) => {
        setLoading(true)
        let blob = dataURItoBlob(imageDataURI)
        const formData = new FormData();

        formData.append('image', blob, "MedicationImage.png");

        try {
            let result = await Axios.post(`api/medicine/image`, formData, { requestId: "medication-update" });
            success_alert("Image Added Sucessfully successfully")
            if (result.data.payload.url) {
                // let image_url= result.data.payload.url.replace(/^\//, '')
                let image_url = result.data.payload.url
                setImage(image_url)
                setLoading(false)
            }
            setLoading(false)

        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error!")
            }
        }
        setLoading(false)
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
                                                <div className=''>
                                                    <TextField
                                                        field={'name'}
                                                        placeholder={'Type Medication Name here..'}
                                                        label_text={<span>Name<span className='text-red-500'>*</span></span>}
                                                        form={form}
                                                    />
                                                </div>
                                                <div>
                                                    <SelectField
                                                        field={"medication_type"}
                                                        label_text={<span>Medication Type<span className='text-red-500'>*</span></span>}
                                                        placeholder={"Type of Medication"}
                                                        form={form}
                                                        options={MEDICATION_TYPE}
                                                    />
                                                </div>
                                                {
                                                    form.values.medication_type && form.values.medication_type.value === OTHER &&
                                                    <TextField
                                                        field={'medication_type_other'}
                                                        placeholder={'Explain other'}
                                                        label_text={<span>Other<span className='text-red-500'>*</span></span>}
                                                        form={form}
                                                    />
                                                }

                                                <TextField
                                                    field={'dosage_amount'}
                                                    placeholder={'e.g., 500'}
                                                    label_text={<span>Dosage Amount<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />
                                                <SelectField
                                                    field={"dosage_unit"}
                                                    label_text={<span>Dosage unit<span className='text-red-500'>*</span></span>}
                                                    placeholder={"Dosage Unit"}
                                                    form={form}
                                                    options={DOSAGE_UNIT}
                                                />
                                                <div className='w-full'>
                                                    <SelectField
                                                        field={"meal"}
                                                        label_text={<span>Meal<span className='text-red-500'>*</span></span>}
                                                        placeholder={"Meal"}
                                                        form={form}
                                                        options={MEAL_OPTION}
                                                    />
                                                </div>
                                                <SelectField
                                                    field={"reminders"}
                                                    label_text={<span>Reminder Type<span className='text-red-500'>*</span></span>}
                                                    placeholder={"Reminder Type"}
                                                    form={form}
                                                    options={NOTIFCATION_TYPE}
                                                />


                                                <TextField
                                                    field={'remainder_time'}
                                                    placeholder={'before medication'}
                                                    label_text={<span>Reminder time (Minutes)<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />
                                                <TextField
                                                    field={'forgot_remainder'}
                                                    placeholder={'forgot to take medication'}
                                                    label_text={<span>Missed Reminder (Minutes)<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />
                                                <TextField
                                                    field={'quantity'}
                                                    placeholder={'Enter Quantity'}
                                                    label_text={<span>Quantity<span className='text-red-500'>*</span></span>}
                                                    form={form}
                                                />
                                                <div className=''>
                                                    <SelectField
                                                        field={"frequency"}
                                                        label_text={<span>Frequency<span className='text-red-500'>*</span></span>}
                                                        placeholder={"Frequency"}
                                                        form={form}
                                                        options={FREQUENCY_LIST}
                                                    />
                                                </div>
                                                {
                                                    form.values.frequency && form.values.frequency.value === OTHERS_FREQUENCY &&
                                                    <div className=''>
                                                        <SelectField
                                                            field={"custom_frequency"}
                                                            label_text={<span>Custom Frequency<span className='text-red-500'>*</span></span>}
                                                            placeholder={"Select..."}
                                                            form={form}
                                                            options={WEEK_DAYS}
                                                            isMulti={true}
                                                        />
                                                    </div>

                                                }

                                                <DateField
                                                    form={form}
                                                    field={'start_from'}
                                                    label_text={<span>Start Date<span className='text-red-500'>*</span></span>}
                                                />
                                                <DateField
                                                    form={form}
                                                    field={'end_date'}
                                                    label_text={<span>End Date<span className='text-red-500'>*</span></span>}
                                                />
                                                <FieldArray name="medicine_dosage">
                                                    {({ push, remove }) => (
                                                        <div>
                                                            <div
                                                                className="inline-flex items-center cursor-pointer space-x-3 px-4 py-2 bg-yellow-500 rounded-xl text-white"
                                                                onClick={() => push({ time: '00:00:00' })}
                                                            >
                                                                <IoAddCircleSharp className="text-white flex-shrink-0 text-2xl" />
                                                                <span> Dosage Time</span>
                                                            </div>
                                                            {form.values.medicine_dosage &&
                                                                form.values.medicine_dosage.length <= 0 && (
                                                                    <p className="text-xs text-red-500">Required</p>
                                                                )}
                                                        </div>
                                                    )}
                                                </FieldArray>
                                                {form.values.medicine_dosage && form.values.medicine_dosage.length > 0 && form.values.medicine_dosage.map((dosage, index) => (
                                                    <div className="relative" key={index}>
                                                        {
                                                            index != 0 &&
                                                            <AiFillDelete onClick={() => handleDelete(form, index)} className="absolute right-0 top-8 text-red-500 text-2xl cursor-pointer" />
                                                        }
                                                        <TimeField
                                                            form={form}
                                                            field={`medicine_dosage.${index}.time`}
                                                            label_text={"Time to take Medication"}
                                                            dosage={dosage}
                                                        />
                                                    </div>
                                                ))}
                                                <div className='col-span-2'>
                                                    <TextareaField
                                                        field={'instructions'}
                                                        label_text={<span>Instructions<span className='text-red-500'>*</span></span>}
                                                        form={form}
                                                        placeholder={"Write Any Instructions here..."}
                                                        height={"150px"}
                                                    />
                                                </div>
                                                <div className='col-span-2'>
                                                    <TextareaField
                                                        field={'additional_notes'}
                                                        label_text={<span>Additional Notes<span className='text-red-500'>*</span></span>}
                                                        form={form}
                                                        placeholder={"Write Additional Notes here..."}
                                                        height={"150px"}
                                                    />
                                                </div>
                                            </div>
                                            <div className=''>
                                                <label className="label font-bold text-xs">
                                                    Image
                                                </label>
                                                <div className='my-5 '>
                                                    <input id="file-upload" type="file"
                                                        onChange={(e) => handleImage(e, form)}
                                                        className={`hidden`} />
                                                    <label for="file-upload" className={`btn cursor-pointer  btn  image-shadow ${image ? "bg-green-700 text-white" : ""} `}>{image ? "Re-Upload?" : "Choose file"}</label>
                                                    {
                                                        image &&
                                                        <div>
                                                            <img loading="lazy" src={BASE_URL + "api" + image} alt='medication-image' className='mt-8 sm:w-72' />
                                                        </div>
                                                    }
                                                    {
                                                        loading &&
                                                        <p className='italic pt-4'>Uploading...</p>

                                                    }


                                                </div>

                                            </div>
                                            <div className="flex items-center pt-3 pb-3">
                                                <button type="button" onClick={form.handleSubmit} disabled={loading || form.isSubmitting} className='block w-full btn btn-primary'>
                                                    {
                                                        form.isSubmitting ?
                                                            <BiLoaderAlt className="animate-spin text-primary text-3xl mx-auto" />
                                                            :
                                                            isUpdate ? "Update" : "Submit"
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