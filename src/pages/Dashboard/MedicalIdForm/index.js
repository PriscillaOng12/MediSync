import React, { useState } from 'react'
import * as yup from "yup";
import { Formik, Form } from "formik";
import { error_alert, getToken, hidePopup, setToken, stringNotEmpty, success_alert } from '../../../utils';
import TextField from "../../../components/FormikFields/TextField";
import SelectField from "../../../components/FormikFields/SelectField";
import { BiLoaderAlt } from "react-icons/bi";
import { Axios } from '../../../api';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BLOOD_TYPES, DATE_FORMAT_DISPLAY, DATE_FORMAT_SERVER, DEFUALT_URL, LOGIN_URL } from '../../../constants';
import DateField from '../../../components/FormikFields/DateField';
import TextareaField from '../../../components/FormikFields/TextareaField';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slices/userSlice';
import Avatar from '../../../components/Avatar';


const FormContainer = ({setPopup}) => {
    const user  = useSelector((state)=>state.user)
    const dispatch = useDispatch();

    const initialValues = {
        // dob: user.date_of_birth ? DateTime.fromISO(user.date_of_birth).toFormat(DATE_FORMAT_DISPLAY): "" ,
        date_of_birth: user.date_of_birth ? user.date_of_birth: "" ,
        blood_group: user.blood_group ? user.blood_group :""  ,
        emergency_contact: user.emergency_contact ? user.emergency_contact:""  ,
        medical_condition: user.medical_condition ? user.medical_condition:"" ,
        allergies: user.allergies ? user.allergies :"",
    }
    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        date_of_birth: yup.string().stringNotEmpty(),
        blood_group: yup.object().nullable().required("Required"),
        medical_condition: yup.string().stringNotEmpty(),
        allergies: yup.string().stringNotEmpty(),
        emergency_contact: yup.string().stringNotEmpty(),
    })

    const handleSubmit = async (values, formikBag) => {
        let payload = {
            date_of_birth: DateTime.fromISO(values.date_of_birth).toFormat(DATE_FORMAT_SERVER),
            blood_group: values.blood_group && values.blood_group.value,
            emergency_contact: values.emergency_contact,
            allergies: values.allergies,
            medical_condition: values.medical_condition
        }
        try {

            const result = await Axios.put("api/users/update-profile", payload, { requestId: "signup" });
            
            // user instance
            const user_payload = {
                ...user,
                ...values,
            }

            // token to save to local storage
            const tokenObj = {
                user,
                access_token: getToken()
            }
            //saved to local storage
            setToken(tokenObj);

            // set redux state
            dispatch(login(user_payload));
            success_alert("Your Medical Id saved successfully!");

            hidePopup(setPopup)
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error")
            }
        }
    }

    return (
        <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {
                form => (
                    <Form>
                        <>
                        <div className='block'>
                            <Avatar/>
                        </div>
                    
                            <div className="">
                                <div className='grid grid-cols-2 gap-5'>
                                <SelectField
                                        field="blood_group"
                                        options={BLOOD_TYPES}
                                        placeholder={"Blood Type"}
                                        form={form}
                                    />
                                    <DateField
                                        field="date_of_birth"
                                        form={form}
                                        placeholder={"DOB"}
                                    />
                                    <TextField
                                        field="emergency_contact"
                                        placeholder={"Emergency Contact"}
                                        form={form}
                                    />
                                    <div className='col-span-2'>
                                        <TextareaField
                                            field="medical_condition"
                                            placeholder={"Medical Conditions"}
                                            form={form}

                                            height={"100px"}
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <TextareaField
                                            field="allergies"
                                            placeholder={"Alergies"}
                                            form={form}

                                            height={"100px"}
                                        />
                                    </div>
    
                                </div>
                                <div className="flex items-center pt-5 pb-1">
                                    <button type="submit" disabled={form.isSubmitting} className='block w-full btn btn-primary'>
                                        {
                                            form.isSubmitting ?
                                                <BiLoaderAlt className="animate-spin text-white text-3xl mx-auto" />
                                                : "Submit"
                                        }
                                    </button>
                                </div>
                            </div>
                        </>
                    </Form>
                )
            }
        </Formik>
        </>
    )
}

export default FormContainer