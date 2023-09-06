import React from 'react'
import * as yup from "yup";
import { Formik, Form } from "formik";
import { error_alert, stringNotEmpty, success_alert } from '../../../../utils';
import TextField from "../../../../components/FormikFields/TextField";
import {BiLoaderAlt} from "react-icons/bi";
import { Axios } from '../../../../api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
    }
    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        email: yup.string().email("Please enter a valid email").required("Required")
    })

    const handleSubmit = async (values, formikBag) => {
        try{
            const result = await Axios.post("api/users/forgot-password", values, {requestId: "forgot-password"});
            navigate("/login")
            success_alert("Please check your email for further details.");
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
                                <div>
                                    <TextField
                                        field="email"
                                        label_text={"Email"}
                                        form={form}
                                    />
                                </div>
                                <div className="flex items-center pt-3 pb-3">
                                    <button type="submit" disabled={form.isSubmitting} className='block w-full btn btn-primary'>
                                        {
                                            form.isSubmitting ? 
                                            <BiLoaderAlt className="animate-spin text-3xl mx-auto"/>
                                            : "Submit"
                                        }
                                    </button>
                                </div>

                                <hr className=''/>
                                <p className="text-xs md:text-sm text-center">
                                    Back to <Link className='text-primary underline font-medium' to="/login">Login</Link>.
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