import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { LogoLoading } from "../../components/Loading";
import Sidebar from '../../components/Sidebar';
import { DEFUALT_URL, PROFILE_URL, SYMPTOMS_URL, CALENDER_URL, MEDICATION_URL, MEDICAL_PROFILE } from '../../constants';

const Dashboard = React.lazy(() => import('../../pages/Dashboard'));
const Profile = React.lazy(() => import('../../pages/Profile'));
const Symptoms=React.lazy(()=>import('../../pages/Symptoms/index'))
const Calender=React.lazy(()=>import('../../pages/Calendar'))
const Medication=React.lazy(()=>import('../../pages/Medications'))
const MedicalProfile=React.lazy(()=>import('../../pages/MedicalId'))



function AdminRoutes(props) {
  return (
    <>
      <Sidebar />
        <Suspense fallback={<LogoLoading />}>
          <Routes>
            <Route path={DEFUALT_URL} element={<Dashboard />} />
            <Route path={PROFILE_URL} element={<Profile />} />            
            <Route path={SYMPTOMS_URL} element={<Symptoms/>}/>
            <Route path={CALENDER_URL} element={<Calender/>}/>
            <Route path={MEDICATION_URL} element={<Medication/>}/>
            <Route path={MEDICAL_PROFILE} element={<MedicalProfile/>}/>


            <Route path='*' element={<Navigate to={DEFUALT_URL} />} />
          </Routes>
        </Suspense>
    </>
  )
}

export default AdminRoutes
