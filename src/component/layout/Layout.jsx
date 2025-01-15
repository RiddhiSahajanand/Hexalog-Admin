import { Outlet, useLocation, useNavigate } from "react-router-dom"
import SuperAdminSidebar from "../Sidebar/Sidebar"
import { TopBar, UserTopBar } from "../Topbar/Topbar";
import { useEffect, useState } from "react";
import UserSideBar from "../Sidebar/UserSideBar";
import Loader from "../Loader/Loader";

export function SuperAdminLayout({ isToogle, setIsToogle }) {

    const navigate = useNavigate();
    const superadmintoken = localStorage.getItem("superadmin-login-token");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!superadmintoken) {
            navigate("/super-admin/login")
        }
    }, [superadmintoken]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);



    // useEffect(() => {
    //     const unlisten = navigate((location, action) => {
    //         setIsLoading(true); // Show loader
    //         setTimeout(() => {
    //             setIsLoading(false); // Hide loader after 2 seconds
    //         }, 2000);
    //     });

    //     return () => unlisten(); // Cleanup listener on unmount
    // }, [navigate]);

    return (
        <div className="full-height">
            <div className="topbar-layout">
                <TopBar />
            </div>
            <div className="d-flex flex-grow-1">
                <div>
                    <SuperAdminSidebar setIsToogle={setIsToogle} />
                </div>
                {isLoading === true ? <Loader /> :
                    <div
                        className={isToogle ? "dashboard-content-mobile flex-grow-1 overflow-auto" : "dashboard-content flex-grow-1 overflow-auto"} >
                        <Outlet />
                    </div>
                }

            </div>
        </div>
    )
}

export function UserLayout({ isToogle, setIsToogle }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();


    const userlogintoken = localStorage.getItem("user-login-token");
    const userregistertoken = localStorage.getItem("user-register-token");
    useEffect(() => {
        if (!userlogintoken && !userregistertoken) {
            navigate("/login");
        }
    }, [userlogintoken])

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);
    return (

        <>
            {/* <Outlet /> */}
            <div className="full-height">
                <div className="topbar-layout">
                    <UserTopBar />
                </div>
                <div className="d-flex flex-grow-1">
                    <div>
                        <UserSideBar setIsToogle={setIsToogle} />
                    </div>
                    {isLoading === true ? <Loader /> :
                        <div
                            className={isToogle ? "dashboard-content-mobile flex-grow-1 overflow-auto" : "dashboard-content flex-grow-1 overflow-auto"} >
                            <Outlet />
                        </div>
                    }
                </div>
            </div>
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


