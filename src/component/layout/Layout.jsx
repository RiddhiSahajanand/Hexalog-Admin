import { Outlet } from "react-router-dom"
import SuperAdminSidebar from "../Sidebar/Sidebar"
import { TopBar } from "../Topbar/Topbar";

export function SuperAdminLayout({ isToogle, setIsToogle }) {
    return (
        <div className="d-flex flex-column full-height">
            <div className="topbar-layout">
                <TopBar />
            </div>
            <div className="d-flex flex-grow-1">
                <div  >
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

// export function UserLayout({ isToogle, setIsToogle }) {
//     return (
//         <div className='main-layout-section'>
//             <div className="d-flex">
//                 <div className={`left-side-sidebar-wrapper ${isToogle ? "active" : ""}`}>
//                     <SubSideBar setIsToogle={setIsToogle} />
//                 </div>
//                 <div className="right-side-body-content">
//                     <Header isToogle={isToogle} setIsToogle={setIsToogle} />
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }