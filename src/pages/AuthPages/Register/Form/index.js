import React, { useState } from 'react'
import * as yup from "yup";
import { Formik, Form } from "formik";
import { error_alert, stringNotEmpty, success_alert } from '../../../../utils';
import TextField from "../../../../components/FormikFields/TextField";
import SelectField from "../../../../components/FormikFields/SelectField";
import { BiLoaderAlt } from "react-icons/bi";
import { Axios } from '../../../../api';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BLOOD_TYPES, DATE_FORMAT_SERVER, DEFUALT_URL, LOGIN_URL } from '../../../../constants';
import DateField from '../../../../components/FormikFields/DateField';
import TextareaField from '../../../../components/FormikFields/TextareaField';
import { DateTime } from 'luxon';


const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const initialValues = {
        first_name: "",
        last_name: "",
        // dob: "",
        // blood: "",
        // email: "",
        // phone_num: "",
        password: "",
        confirm_pass: "",
        // medical_condition: "",
        // alergies: "",
    }
    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        first_name: yup.string().stringNotEmpty(),
        last_name: yup.string().stringNotEmpty(),
        // dob: yup.string().stringNotEmpty(),
        // blood: yup.object().nullable().required("Required"),
        email: yup.string().stringNotEmpty(),
        // medical_condition: yup.string().stringNotEmpty(),
        // alergies: yup.string().stringNotEmpty(),
        // phone_num: yup.string().stringNotEmpty(),
        password: yup.string().required("Required")
            .min(8, "Password too short, must be at least 8 characters long.")
            .matches(/[a-z]/, "Please include a smallcase letter in your password.")
            .matches(/[A-Z]/, "Please include an uppercase letter in your password.")
            .matches(/\d/, "Please include a number in your password.")
            .matches(/\W|_/, "Please include a special character in your password."),
        confirm_pass: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required("Required")
    })

    const handleSubmit = async (values, formikBag) => {
        let payload = {

            first_name: values.first_name,
            last_name: values.last_name,
            // date_of_birth: DateTime.fromISO(values.dob).toFormat(DATE_FORMAT_SERVER),
            // blood_group: values.blood && values.blood.value,
            email: values.email,
            // emergency_contact: values.phone_num,
            // allergies: "hdh,djjdjd",
            password: values.password,
            // medical_condition: "ejrhejw"
        }
        try {

            const result = await Axios.post("api/users/sign-up", payload, { requestId: "signup" });
            success_alert("You have been sign up successfully!");
            navigate(LOGIN_URL)
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error")
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {
                form => (
                    <Form>
                        <>
                            <div className="">
                                <div className=' grid grid-cols-1 items-center gap-5'>
                                    <TextField
                                        field="first_name"
                                        placeholder={"First Name"}
                                        form={form}
                                    />
                                    <TextField
                                        field="last_name"
                                        placeholder={"Last Name"}
                                        form={form}
                                    />
                                    {/* <SelectField
                                        field="blood"
                                        options={BLOOD_TYPES}
                                        placeholder={"Blood Type"}
                                        form={form}
                                    /> */}
                                    <TextField
                                        field="email"
                                        placeholder={"Email"}
                                        form={form}
                                    />
                                    {/* <DateField
                                        field="dob"
                                        form={form}
                                        placeholder={"DOB"}
                                    /> */}
                                    {/* <TextField
                                        field="phone_num"
                                        placeholder={"Contact No"}
                                        form={form}
                                    /> */}
                                    <div className='relative'>
                                        <TextField
                                            field="password"
                                            placeholder={"Password"}
                                            form={form}
                                            password={!showPassword}
                                        />
                                        {
                                            showPassword ?
                                                <AiFillEye className="text-2xl absolute right-2 cursor-pointer top-3" onClick={() => setShowPassword(!showPassword)} />
                                                :
                                                <AiFillEyeInvisible className="text-2xl absolute right-2 cursor-pointer top-3  " onClick={() => setShowPassword(!showPassword)} />


                                        }
                                    </div>
                                    <div className='relative'>
                                        <TextField
                                            field="confirm_pass"
                                            placeholder={"Confirm Password"}
                                            form={form}
                                            password
                                        />
                                    </div>

                                    {/* <div className='col-span-2'>
                                        <TextareaField
                                            field="medical_condition"
                                            placeholder={"Medical Condition"}
                                            form={form}

                                            height={"100px"}
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <TextareaField
                                            field="alergies"
                                            placeholder={"Alergies"}
                                            form={form}

                                            height={"100px"}
                                        />
                                    </div> */}
                                </div>
                                <div className="flex items-center pt-5 pb-1">
                                    <button type="submit" disabled={form.isSubmitting} className='block w-full btn btn-primary'>
                                        {
                                            form.isSubmitting ?
                                                <BiLoaderAlt className="animate-spin text-white text-3xl mx-auto" />
                                                : "Register"
                                        }
                                    </button>
                                </div>
                                <Link className='text-primary underline font-medium text-xs text-center flex justify-center pt-4' to={LOGIN_URL}>Back to Login?</Link>

                            </div>
                        </>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Register