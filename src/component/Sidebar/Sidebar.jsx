
import React, { useState } from 'react';
import './Sidebar.css';
import LeftView from "../../assets/left-view.png";
import RightView from "../../assets/right-view.png";
import { useLocation } from 'react-router-dom';
import home1 from "../../assets/home1.png";
import home2 from "../../assets/home 2.png";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import roles1 from "../../assets/roles1.png";
import roles2 from "../../assets/roles2.png";

const SuperAdminSidebar = ({ setIsToogle }) => {
    const [isMobile, setIsMobile] = useState(false);

    const location = useLocation();

    const toggleSidebar = () => {
        setIsMobile(!isMobile);
        localStorage.setItem("isMobile", isMobile)
        setIsToogle(!isMobile)
    };
    const pathName = location.pathname

    return (
        <>
            <div className='bg-light flex-shrink-0'>
                <div className={isMobile ? "sidebar-layout-mobile sidebar-view-section-mobile" : "sidebar-layout"}>
                    {isMobile ? (
                        <div className="mobile-sidebar">
                            <ul className="mt-5 px-5">
                                {pathName === `/super-admin/dashboard` ?
                                    <div className="mb-3">
                                        <a href="/super-admin/dashboard">
                                            <img src={home2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="/super-admin/dashboard">
                                            <img src={home1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                                {pathName === `/super-admin/users` ?
                                    <div className="mb-3">
                                        <a href="/super-admin/users">
                                            <img src={user2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="/super-admin/users">
                                            <img src={user1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                                {pathName === `/super-admin/roles` ?
                                    <div className="mb-3">
                                        <a href="/super-admin/roles">
                                            <img src={roles2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="/super-admin/roles">
                                            <img src={roles1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                            </ul>
                            <div className="left-view" onClick={toggleSidebar}>
                                <img src={RightView} alt="Toggle Sidebar" />
                            </div>
                        </div>
                    ) : (
                        <div className="siderbar">
                            <ul className="mt-5 px-5">
                                <div>
                                    {pathName === `/super-admin/dashboard` ?
                                        <div className={`mb-3 d-flex align-items-center `} style={{ cursor: 'pointer' }}>
                                            <img src={home2} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="/super-admin/dashboard"
                                                className="item-name ps-2 mt-3 new-selected-text" >
                                                <p className="">Dashboard</p>
                                            </a>
                                        </div> :
                                        <div className={`mb-3 d-flex align-items-center`} style={{ cursor: 'pointer' }}>
                                            <img src={home1} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="/super-admin/dashboard"
                                                className="item-name ps-2 mt-3 selected-text" >
                                                <p className="">Dashboard</p>
                                            </a>
                                        </div>
                                    }
                                </div>
                                <div className="mb-3 d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                    <a href="#" className="item-name-label">Support</a>
                                </div>

                                {pathName === `/super-admin/users` ?
                                    <div className="mb-0 d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                        <img src={user2} alt="Home Icon" style={{ width: '20px' }} />
                                        <a href="/super-admin/users" className="item-name ps-2 mt-3 new-selected-text">
                                            <p className="">Users</p>
                                        </a>
                                    </div>
                                    :
                                    <div className="mb-0 d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                        <img src={user1} alt="Home Icon" style={{ width: '20px' }} />
                                        <a href="/super-admin/users" className="item-name ps-2 mt-3 selected-text">
                                            <p className="">Users</p>
                                        </a>
                                    </div>
                                }
                                {pathName === `/super-admin/roles` ?
                                    <div className="mb-3 d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                        <img src={roles2} alt="Home Icon" style={{ width: '20px' }} />
                                        <a href="/super-admin/roles" className="item-name ps-2 mt-3 new-selected-text">
                                            <p className="">Roles</p>
                                        </a>
                                    </div>
                                    :
                                    <div className="mb-3 d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                        <img src={roles1} alt="Home Icon" style={{ width: '20px' }} />
                                        <a href="/super-admin/roles" className="item-name ps-2 mt-3 selected-text">
                                            <p className="">Roles</p>
                                        </a>
                                    </div>
                                }
                            </ul>
                            <div className="left-view" onClick={toggleSidebar}>
                                <img src={LeftView} alt="Toggle Sidebar" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SuperAdminSidebar;

