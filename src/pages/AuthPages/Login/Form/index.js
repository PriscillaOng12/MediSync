import React from 'react'
import * as yup from "yup";
import { Formik, Form } from "formik";
import { error_alert, setToken, stringNotEmpty, success_alert } from '../../../../utils';
import TextField from "../../../../components/FormikFields/TextField";
import { BiLoaderAlt } from "react-icons/bi";
import { Axios } from '../../../../api';
import { Link } from 'react-router-dom';
import { login } from '../../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react';
import { FORGOT_PASSOWORD_URL, REGISTER_URL } from '../../../../constants';
import Google from '../../../../components/Google';

const REMBER_ME_CONST = "remeber_me_check"
const Login = () => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false)



    const initialValues = {
        email: "",
        password: "",
    }
    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        email: yup.string().stringNotEmpty(),
        password: yup.string().stringNotEmpty(),
    })

    const handleSubmit = async (values, formikBag) => {
        try {
            const result = await Axios.post("api/users/login", values, { requestId: "login-post" });
            const user = {
                id: result.data.payload.id,
                email: result.data.payload.email,
                first_name: result.data.payload.first_name,
                last_name: result.data.payload.last_name,
                allergies: result.data.payload.allergies,
                blood_group: {label: result.data.payload.blood_group , value:result.data.payload.blood_group },
                date_of_birth: result.data.payload.date_of_birth,
                emergency_contact: result.data.payload.emergency_contact,
                medical_condition: result.data.payload.medical_condition,
                role: result.data.payload.role,
                image: result.data.payload.image,
                is_email_verified: result.data.payload.is_email_verified
            }

            // token to save to local storage
            const tokenObj = {
                user,
                access_token: result.data.payload.access_token
            }
            //saved to local storage
            setToken(tokenObj);

            // set redux state
            dispatch(login(user));
            success_alert("Logged in successfully!");
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error!")
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {
                form => (
                    <Form>
                        <>
                            <div className="space-y-5">
                                <div>
                                    <TextField
                                        field="email"
                                        label_text={"Email"}
                                        form={form}
                                    />
                                </div>
                                <div className='relative'>
                                    <TextField
                                        field="password"
                                        label_text={"Password"}
                                        form={form}
                                        password={!showPassword}
                                    />
                                    {
                                        showPassword ?
                                            <AiFillEye className="text-2xl absolute right-2 cursor-pointer top-8  " onClick={() => setShowPassword(!showPassword)} />
                                            :
                                            <AiFillEyeInvisible className="text-2xl absolute right-2 cursor-pointer top-8  " onClick={() => setShowPassword(!showPassword)} />


                                    }

                                    <p className="text-xs mt-2  text-right">
                                        <Link className='text-primary underline font-medium' to={FORGOT_PASSOWORD_URL}>Forgot Password?</Link>.
                                    </p>
                                    <REMBERFIELD form={form} />
                                </div>


                                <div className="flex items-center pt-3 pb-1">
                                    <button type="submit" disabled={form.isSubmitting} className='block w-full btn btn-primary'>
                                        {
                                            form.isSubmitting ?
                                                <BiLoaderAlt className="animate-spin text-white text-3xl mx-auto" />
                                                : "Login"
                                        }
                                    </button>
                                </div>
                                <div className='space-y-2'>
                                    {/* <p className='text-center text-gray-400'>OR</p> */}
                                    <div className='flex justify-center '>
                                        <Google />
                                    </div>
                                </div>

                                <hr className='' />
                                <p className="text-xs md:text-sm text-center">
                                    Not have an account ? <Link className='text-primary underline font-medium' to={REGISTER_URL}>Register here</Link>.
                                </p>

                            </div>
                        </>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Login




const REMBERFIELD = (form) => {

    const [isRemeberMe, setIsRememberMe] = useState(() => {
        let data = JSON.parse(localStorage.getItem(REMBER_ME_CONST))
        if (data&&data.checked) {
            form.form.setFieldValue("email", data.email)
            form.form.setFieldValue("password", data.password)
            return data.checked
        } else {
            return false
        }
    })

    const RememberMe = () => {
        let obj = {
            email: form.form.values.email,
            password: form.form.values.password,
            checked: !isRemeberMe
        }
        setIsRememberMe(!isRemeberMe)
        localStorage.setItem(REMBER_ME_CONST, JSON.stringify(obj))
    }



    return (

        <div className='flex items-center space-x-2 mt-3'>
            <input type="checkbox" className='w-4 h-4 cursor-pointer' checked={isRemeberMe} value={isRemeberMe} onClick={RememberMe} /> <label className='text-sm text-primary  font-medium' >Remember me</label>
        </div>

    )
}