import React, { useState } from 'react'
import TextField from '../../../components/FormikFields/TextField';
import TextareaField from '../../../components/FormikFields/TextareaField';
import { Axios } from '../../../api';
import { success_alert, error_alert, stringNotEmpty, getToken, setToken, warning_alert } from '../../../utils';
import * as yup from "yup";
import { Formik, Form } from "formik";
import { BiLoaderAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slices/userSlice';
import DateField from '../../../components/FormikFields/DateField';
import { BASE_URL, BLOOD_TYPES, IMAGE_BASE_URL, IMAGE_URl, SUPPORTED_IMAGES, dataURLtoBlob } from '../../../constants';
import SelectField from '../../../components/FormikFields/SelectField';
import Avatar from '../../../components/Avatar';

const UpdateProfileName = () => {
    const user = useSelector(state => state.user);
    const [image, setImage] = useState("")
    const dispatch = useDispatch();


    const initialValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        // allergies: user.allergies,
        // blood_group: {label:user.blood_group, value:user.blood_group},
        // date_of_birth: user.date_of_birth,
        // emergency_contact: user.emergency_contact,
        // medical_condition:user.medical_condition,
        // role: user.role,
    }

    yup.addMethod(yup.string, 'stringNotEmpty', stringNotEmpty)
    const validationSchema = yup.object({
        first_name: yup.string().stringNotEmpty(),
        last_name: yup.string().stringNotEmpty(),
        email: yup.string().stringNotEmpty(),
        // // allergies: yup.string().stringNotEmpty(),
        // // blood_group:yup.object().nullable().required("Required"),
        // // date_of_birth: yup.string().stringNotEmpty(),
        // // emergency_contact: yup.string().stringNotEmpty(),
        // // medical_condition:yup.string().stringNotEmpty(),
    })


    const handleSubmit = async (values, formikBag) => {
        try {
            //construct url
            const result = await Axios.put(`api/users/update-profile`, values, { requestId: "update-profile", });
            success_alert(result.data.description);


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
        } catch (e) {
            if (e.response) {
                error_alert(JSON.stringify(e.response.data.description))
            } else {
                error_alert("Network Error!")
            }
        }
    }

    


    // api/users/image

    return (
        <div className='w-full flex '>
            <div className='w-full xl:w-10/12 2xl:w-8/12 block'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        form => (
                            <Form className=''>
                                <>
                                    <div className=' grid grid-cols-1 sm:grid-cols-2 items-center gap-2'>
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
                                            field="blood_group"
                                            options={BLOOD_TYPES}
                                            placeholder={"Blood Type"}
                                            form={form}
                                        /> */}

                                        <TextField
                                            field="email"
                                            placeholder={"Email"}
                                            form={form}
                                            isDisabled={true}
                                        />
                                        {/* 
                                        <DateField
                                            field="date_of_birth"
                                            form={form}
                                            placeholder={"DOB"}
                                        />
                                        <TextField
                                            field="emergency_contact"
                                            placeholder={"Contact No"}
                                            form={form}
                                        />
                                        <div className='sm:col-span-2'>
                                            <TextareaField
                                                field="medical_condition"
                                                placeholder={"Medical Condition"}
                                                form={form}

                                                height={"100px"}
                                            />
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <TextareaField
                                                field="allergies"
                                                placeholder={"Alergies"}
                                                form={form}

                                                height={"100px"}
                                            />
                                        </div> */}
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
            </div>
            <div className='w-full xl:w-[16.666667%] 2xl:w-[33.333333%]   '>
                <Avatar/>
            </div>


        </div>
    )
}

export default UpdateProfileName