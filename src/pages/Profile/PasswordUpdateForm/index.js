import React from 'react'
import TextField from '../../../components/FormikFields/TextField';
import { Axios } from '../../../api';
import { success_alert, error_alert, stringNotEmpty} from '../../../utils';
import * as yup from "yup";
import {Formik, Form} from "formik";
import {BiLoaderAlt} from 'react-icons/bi';

 const PasswordUpdateForm = () => {

    const initialValues = {
        old_password: "",
        new_password: "",
        confirm_password: "",
    }

    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        old_password: yup.string()
        .stringNotEmpty(),
        new_password: yup.string().required("Required")
        .min(8, "Password too short, must be at least 8 characters long.")
        .matches(/[a-z]/, "Please include a smallcase letter in your password.")
        .matches(/[A-Z]/, "Please include an uppercase letter in your password.")
        .matches(/\d/, "Please include a number in your password.")
        .matches(/\W|_/, "Please include a special character in your password."),
        confirm_password: yup.string().oneOf([yup.ref('new_password'), null], "Passwords don't match").required("Required"),

    })


    const handleSubmit = async (values, formikBag) => {
        try {
            const result = await Axios.put(`api/users/update-password`, values, { requestId: "update-password",});
            success_alert(result.data.description);
            formikBag.resetForm();
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
                    <Form className='w-full xl:w-10/12 2xl:w-8/12 block'>
                        <>
                            <div className="grid grid-cols-3 gap-5">
                                <TextField
                                password
                                    field="old_password"
                                    label_text={"Old Password*"}
                                    form={form}
                                />
                                <TextField
                                password
                                    field="new_password"
                                    label_text={"New Password*"}
                                    form={form}
                                />
                                <TextField
                                password
                                    field="confirm_password"
                                    label_text={"Confirm Password*"}
                                    form={form}
                                />

                            </div>
                            <button type="submit" disabled={form.isSubmitting} className='mt-5 w-full btn btn-primary'>
                                {
                                    form.isSubmitting ?
                                        <BiLoaderAlt className="animate-spin mx-auto text-3xl" />
                                        : "Submit"
                                }
                            </button>
                        </>
                    </Form>
                )
            }
        </Formik>
    )
}

export default PasswordUpdateForm