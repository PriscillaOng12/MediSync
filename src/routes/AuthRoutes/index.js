import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from "react-router";
import { LogoLoading } from "../../components/Loading";
import { FORGOT_PASSOWORD_URL, REGISTER_URL, RESET_PASSOWORD_URL } from '../../constants';

const Login = React.lazy(()=>import('../../pages/AuthPages/Login'));
const ForgotPassword = React.lazy(()=>import('../../pages/AuthPages/ForgotPassword'));
const ResetPassword = React.lazy(()=>import('../../pages/AuthPages/ResetPassword'));
const Register = React.lazy(()=>import('../../pages/AuthPages/Register'));


function AuthRoute() {

    return (
        <>
            <Suspense fallback={<LogoLoading />}>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path={FORGOT_PASSOWORD_URL} element={<ForgotPassword />} />
                    <Route path={RESET_PASSOWORD_URL+'/:token'} element={<ResetPassword />} />
                    <Route path={REGISTER_URL} element={<Register />} />

                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default AuthRoute
