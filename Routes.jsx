import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom";

import { SuperAdminLayout, UserLayout } from './src/component/layout/Layout';

import SuperAdminLogin from './src/pages/SuperAdmin/SuperAdminLogin/SuperAdminLogin';
import SuperAdminDashboard from './src/pages/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard';
import SuperAdminUsers from './src/pages/SuperAdmin/SuperAdminUsers/SuperAdminUsers';
import SuperAdminRoles from './src/pages/SuperAdmin/SuperAdminRoles/SuperAdminRoles';

import Login from './src/pages/Users/Login/Login';
import Forgotpassword from './src/pages/Users/Forgotpassword/Forgotpassword';
import LoginOTP from './src/pages/Users/LoginOTP/LoginOTP';
import Createpassword from './src/pages/Users/Createpassword/Createpassword';
import Welcomepage from './src/pages/Users/Welcomepage/Welcomepage';
import Dashboard from './src/pages/Users/Dashboard/Dashboard';
import Register from './src/pages/Users/Register/Register';
import CreateKYC from './src/pages/Users/CreateKYC/CreateKYC';
import Changepassword from './src/pages/Users/Changepassword/Changepassword';
import Profile from './src/pages/Users/Profile/Profile';
// import SkipKyc from './src/pages/Users/SkipKyc/SkipKyc';


const AppRoutes = () => {
    const [isToogle, setIsToogle] = useState(false);

    return (
        <Routes>
            {/* Super Admin  */}
            <Route path='/super-admin/login' element={<SuperAdminLogin />} />

            <Route element={<SuperAdminLayout isToogle={isToogle} setIsToogle={setIsToogle} />}>
                <Route path='/super-admin/dashboard' element={<SuperAdminDashboard />} />
                <Route path='/super-admin/users' element={<SuperAdminUsers />} />
                <Route path='/super-admin/roles' element={<SuperAdminRoles />} />
            </Route>

            {/* Users  */}
            <Route path='/register' element={<Register />} />
            <Route path='/createkyc' element={<CreateKYC />} />

            <Route path="/login" element={<Login />} />
            <Route path='/ForgottPassword' element={<Forgotpassword />} />
            <Route path='/OtpVerification' element={<LoginOTP />} />
            <Route path='/createPassword' element={<Createpassword />} />

            <Route path='/welcome' element={<Welcomepage />} />

            <Route element={<UserLayout />}>
                <Route path='/changePassword' element={<Changepassword />} />

                {/* <Route path='/skipcreatekyc' element={<SkipKyc />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes;
