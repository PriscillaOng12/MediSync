import React, { useState } from 'react'
import { GoogleOAuthProvider, googleLogout, hasGrantedAllScopesGoogle, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { BiLoaderAlt } from 'react-icons/bi';
import { GOOGLE_CLIENT_ID, GOOGLE_LOGIN_CONST } from '../../constants';
import { login } from '../../redux/slices/userSlice';
import { error_alert, setToken, success_alert } from '../../utils';
import { Axios } from '../../api';
import { useDispatch } from 'react-redux';

const GoogleProvider = ({ text, sync }) => {

    const [authLoading, setAuthLoading] = useState(false)

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin authLoading={authLoading} setAuthLoading={setAuthLoading} text={text} sync={sync} />
        </GoogleOAuthProvider>
    )
}

const GoogleLogin = ({ authLoading, setAuthLoading, text, sync }) => {
    const dispatch = useDispatch()

    const googel_login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            hitLoginApi(codeResponse.access_token)
        },
        onError: (error) => {
            setAuthLoading(false)
        },

        scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/admin.directory.resource.calendar', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.events']
    });
    // const hasAccess = hasGrantedAllScopesGoogle(
    //     codeResponse.access_token,
    //     'https://www.googleapis.com/auth/calendar.events',
    //     'https://www.googleapis.com/auth/calendar.events',
    // );




    const hitLoginApi = async (token) => {
        let payload = {
            token: token,
            backend: GOOGLE_LOGIN_CONST
        }
        try {
            const result = await Axios.post("api/users/social/auth", payload, { requestId: "googe-login-post" });
            const user = {
                id: result.data.payload.id,
                email: result.data.payload.email,
                first_name: result.data.payload.first_name,
                last_name: result.data.payload.last_name,
                allergies: result.data.payload.allergies,
                blood_group: result.data.payload.blood_group,
                date_of_birth: result.data.payload.date_of_birth,
                emergency_contact: result.data.payload.emergency_contact,
                medical_condition: result.data.payload.medical_condition,
                role: result.data.payload.role,
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
        <button type="button" disabled={authLoading} onClick={() => googel_login()}
            className='btn btn-small flex items-center space-x-3 justify-center text-black'>
            <FcGoogle className="text-2xl" />
            {/* {
            authLoading ?
                <BiLoaderAlt className='text-white animate-spin text-2xl' />
            : */}
            <p>
                {
                    text ?
                        "Sync With Google"
                        :
                        "Continue with Google"
                }
            </p>
            {/* } */}
        </button>
    )
}

export default GoogleProvider