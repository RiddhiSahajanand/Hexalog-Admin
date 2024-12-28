import { Outlet, useNavigate } from "react-router-dom"
import SuperAdminSidebar from "../Sidebar/Sidebar"
import { TopBar } from "../Topbar/Topbar";
import { useEffect } from "react";

export function SuperAdminLayout({ isToogle, setIsToogle }) {

    const navigate = useNavigate();
    const superadmintoken = localStorage.getItem("superadmin-login-token");

    useEffect(() => {
        if (!superadmintoken) {
            navigate("/super-admin/login")
        }
    }, [superadmintoken]);

    return (
        <div className="full-height">
            <div className="topbar-layout">
                <TopBar />
            </div>
            <div className="d-flex flex-grow-1">
                <div>
                    <SuperAdminSidebar setIsToogle={setIsToogle} />
                </div>
                <div
                    className={isToogle ? "dashboard-content-mobile flex-grow-1 overflow-auto" : "dashboard-content flex-grow-1 overflow-auto"} >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export function UserLayout({ isToogle, setIsToogle }) {

    const navigate = useNavigate();

    const userlogintoken = localStorage.getItem("user-login-token");
    const userregistertoken = localStorage.getItem("user-register-token");


    useEffect(() => {
        if (!userlogintoken && !userregistertoken) {
            navigate("/login");
        }
    }, [userlogintoken])


    return (

        <>
            <Outlet />
        </>
        // <div className='main-layout-section'>
        //     <div className="d-flex">
        //         <div className={`left-side-sidebar-wrapper ${isToogle ? "active" : ""}`}>
        //             <SubSideBar setIsToogle={setIsToogle} />
        //         </div>
        //         <div className="right-side-body-content">
        //             <Header isToogle={isToogle} setIsToogle={setIsToogle} />
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
    )
}