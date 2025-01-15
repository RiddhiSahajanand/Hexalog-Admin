import React, { useState } from 'react';
import './Sidebar.css';
import LeftView from "../../assets/left-view.png";
import RightView from "../../assets/right-view.png";
import { useLocation } from 'react-router-dom';
import home1 from "../../assets/home1.png";
import home2 from "../../assets/home 2.png";
import shipment1 from "../../assets/shipment1.png";
import shipment2 from "../../assets/shipment2.png";
import invoice1 from "../../assets/invoice1.png";
import invoice2 from "../../assets/invoice2.png";
import payment1 from "../../assets/payment1.png";
import payment2 from "../../assets/payment2.png";
import code1 from "../../assets/code1.png";
import code2 from "../../assets/code2.png";



const UserSideBar = ({ setIsToogle }) => {
    const [isMobile, setIsMobile] = useState(false);

    const location = useLocation();

    const toggleSidebar = () => {
        setIsMobile(!isMobile);
        localStorage.setItem("isMobile", isMobile)
        setIsToogle(!isMobile)
    };
    const pathName = location.pathname
    console.log('====================================');
    console.log("isMobile", isMobile);
    console.log('====================================');
    return (
        <>
            <div className='bg-light flex-shrink-0'>
                <div className={isMobile ? "sidebar-layout-mobile sidebar-view-section-mobile" : "sidebar-layout"}>
                    {isMobile ? (
                        <div className="mobile-sidebar">
                            <ul className="mt-5" style={{ marginLeft: '8px' }}>
                                {pathName === `/dashboard` ?
                                    <div className="mb-3">
                                        <a href="/dashboard">
                                            <img src={home2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="/dashboard">
                                            <img src={home1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                                {pathName === `/shipment` ?
                                    <div className="mb-3">
                                        <a href="#">
                                            <img src={shipment2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="#">
                                            <img src={shipment1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                                {pathName === `/hsn-codes` ?
                                    <div className="mb-3">
                                        <a href="/hsn-codes">
                                            <img src={code2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="/hsn-codes">
                                            <img src={code1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                                {pathName === `/invoice` ?
                                    <div className="mb-3">
                                        <a href="#">
                                            <img src={invoice2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="#">
                                            <img src={invoice1} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div>
                                }
                                {pathName === `/payment` ?
                                    <div className="mb-3">
                                        <a href="#">
                                            <img src={payment2} alt="Home Icon" style={{ width: '20px' }} />
                                        </a>
                                    </div> :
                                    <div className="mb-3">
                                        <a href="#">
                                            <img src={payment1} alt="Home Icon" style={{ width: '20px' }} />
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
                            <ul className="mt-5">
                                <div>
                                    {pathName === `/dashboard` ?
                                        <div className={`mb-0 d-flex align-items-center `} style={{ cursor: 'pointer' }}>
                                            <img src={home2} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="/dashboard"
                                                className="item-name ps-2 mt-3 new-selected-text" >
                                                <p className="">Dashboard</p>
                                            </a>
                                        </div> :
                                        <div className={`mb-0 d-flex align-items-center`} style={{ cursor: 'pointer' }}>
                                            <img src={home1} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="/dashboard"
                                                className="item-name ps-2 mt-3 selected-text" >
                                                <p className="">Dashboard</p>
                                            </a>
                                        </div>
                                    }
                                    {pathName === `/shipments` ?
                                        <div className={`mb-0 d-flex align-items-center `} style={{ cursor: 'pointer' }}>
                                            <img src={shipment2} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="#"
                                                className="item-name ps-2 mt-3 new-selected-text" >
                                                <p className="">Shipments</p>
                                            </a>
                                        </div> :
                                        <div className={`mb-0 d-flex align-items-center`} style={{ cursor: 'pointer' }}>
                                            <img src={shipment1} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="#"
                                                className="item-name ps-2 mt-3 selected-text" >
                                                <p className="">Shipments</p>
                                            </a>
                                        </div>
                                    }
                                    {pathName === `/hsn-codes` ?
                                        <div className={`mb-0 d-flex align-items-center `} style={{ cursor: 'pointer' }}>
                                            <img src={code2} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="/hsn-codes"
                                                className="item-name ps-2 mt-3 new-selected-text" >
                                                <p className="">HSN Codes</p>
                                            </a>
                                        </div> :
                                        <div className={`mb-0 d-flex align-items-center`} style={{ cursor: 'pointer' }}>
                                            <img src={code1} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="/hsn-codes"
                                                className="item-name ps-2 mt-3 selected-text" >
                                                <p className="">HSN Codes</p>
                                            </a>
                                        </div>
                                    }
                                    {pathName === `/invoice` ?
                                        <div className={`mb-0 d-flex align-items-center `} style={{ cursor: 'pointer' }}>
                                            <img src={invoice2} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="#"
                                                className="item-name ps-2 mt-3 new-selected-text" >
                                                <p className="">Invoice</p>
                                            </a>
                                        </div> :
                                        <div className={`mb-0 d-flex align-items-center`} style={{ cursor: 'pointer' }}>
                                            <img src={invoice1} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="#"
                                                className="item-name ps-2 mt-3 selected-text" >
                                                <p className="">Invoice</p>
                                            </a>
                                        </div>
                                    }
                                    {pathName === `/payments` ?
                                        <div className={`mb-0 d-flex align-items-center `} style={{ cursor: 'pointer' }}>
                                            <img src={payment2} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="#"
                                                className="item-name ps-2 mt-3 new-selected-text" >
                                                <p className="">Payments</p>
                                            </a>
                                        </div> :
                                        <div className={`mb-0 d-flex align-items-center`} style={{ cursor: 'pointer' }}>
                                            <img src={payment1} alt="Home Icon" style={{ width: '20px' }} />
                                            <a href="#"
                                                className="item-name ps-2 mt-3 selected-text" >
                                                <p className="">Payments</p>
                                            </a>
                                        </div>
                                    }
                                </div>
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

export default UserSideBar;

