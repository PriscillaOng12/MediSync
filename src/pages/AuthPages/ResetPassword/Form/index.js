import React from 'react'
import * as yup from "yup";
import { Formik, Form } from "formik";
import { error_alert, stringNotEmpty, success_alert } from '../../../../utils';
import TextField from "../../../../components/FormikFields/TextField";
import {BiLoaderAlt} from "react-icons/bi";
import { Axios } from '../../../../api';
import { useNavigate, useParams } from 'react-router-dom';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { LOGIN_URL } from '../../../../constants';
import { useState } from 'react';

const Login = () => {
    const {token} =useParams();
    const navigate=useNavigate();
    const [showPassword,setShowPassword] = useState(false)


    const initialValues = {
        new_password: "",
        confirm_password: "",
    }
    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        new_password: yup.string().required("Required")
        .min(8, "Password too short, must be at least 8 characters long.")
        .matches(/[a-z]/, "Please include a smallcase letter in your password.")
        .matches(/[A-Z]/, "Please include an uppercase letter in your password.")
        .matches(/\d/, "Please include a number in your password.")
        .matches(/\W|_/, "Please include a special character in your password."),
        confirm_password: yup.string().oneOf([yup.ref('new_password'), null], "Passwords don't match").required("Required"),

    })

    const handleSubmit = async (values, formikBag) => {
        let payload={
            token:token,
            password:values.new_password
        }
        try{
            const result = await Axios.post("api/users/reset-password", payload, {requestId: "reset-post"});
            success_alert(result.data.description);
            navigate(LOGIN_URL)
        } catch(e){
            if(e.response){
                error_alert(JSON.stringify(e.response.data.description))
            } else{
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
                                <div className='relative'>
                                    <TextField
                                        field="new_password"
                                        label_text={"Password"}
                                        form={form}
                                        password={!showPassword}
                                        />
                                        {
                                            showPassword?
                                            <AiFillEye className="text-2xl absolute right-2 cursor-pointer top-8  "  onClick={()=>setShowPassword(!showPassword)} />
                                            :
                                            <AiFillEyeInvisible className="text-2xl absolute right-2 cursor-pointer top-8  "  onClick={()=>setShowPassword(!showPassword)} />
    
    
                                        }
                                </div>
                                <div>
                                    <TextField
                                        field="confirm_password"
                                        label_text={"Confirm Password"}
                                        form={form}
                                        password
                                    />
                                </div>
                                <div className="flex items-center pt-3 pb-3">
                                    <button type="submit" disabled={form.isSubmitting || !form.values.confirm_password } className='block w-full btn btn-primary'>
                                        {
                                            form.isSubmitting ? 
                                            <BiLoaderAlt className="animate-spin text-white text-3xl mx-auto"/>
                                            : "Reset Password"
                                        }
                                    </button>
                                </div>

                            </div>
                        </>
                    </Form>
                )
            }
        </Formik>
    )
}

export default Login