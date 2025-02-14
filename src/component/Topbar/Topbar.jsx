
import React, { useState, useRef } from 'react';
import logo from "../../assets/hexalog-logo-1.png";
import menu from "../../assets/menu-bar.png";
import close from "../../assets/close.png";
import emailIcon from "../../assets/mail.png";
import notificationIcon from "../../assets/notifications.png";
import Userdropdown from "../../assets/User dropdown.svg";
import avatar from "../../assets/Avatar.svg";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import home from "../../assets/home.png";
import user from "../../assets/user.png";
import users from "../../assets/users.png";
import favicon from "../../assets/hexa-favicon.svg";
import rightArrow from "../../assets/right-Arrow.png";
import downArrow from "../../assets/down-Arrow.png";
import UserIcon from "../../assets/new.png";
import LogoutModal from '../Modal/logout/LogoutModal';
import searchIcon from "../../assets/search.png";
import ScheduleDemo from '../Modal/scheduledemo/ScheduleDemo';
import Avatar from 'react-avatar';

export function TopBar() {
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ismenu, setMenu] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const superAdmin = localStorage.getItem("superadmin");

    const handleOpenmenu = () => {
        setMenu(prev => !prev);
        setDropdownOpen(false);
    }
    const handleLogout = (event) => {
        event.stopPropagation();
        setDropdownOpen(false);
        localStorage.removeItem("superadmin-login-token");
        navigate("/super-admin/login");
        setIsShow(true);
    };
    const handleClose = () => {
        setIsShow(false);
    }

    const handleDashboard = () => {
        navigate('/super-admin/dashboard')
    }

    return (
        <>
            <div className="align-items-center px-5 py-1 bg-white topbar">
                <img src={logo} alt="logo" style={{ width: '160px', cursor: 'pointer' }} onClick={handleDashboard} />
                {/* <div className="input-group top-search-box mx-5 w-50">
                    <span className="input-group-text bg-white border-0">
                        <img src={searchIcon} alt="" style={{ height: '16px' }} />
                    </span>
                    <input
                        type="text"
                        className="form-control custom-placeholder border-0"
                        placeholder="Type to search"
                        style={{ color: '#B4B4B4' }}
                        onFocus={(e) => e.target.classList.add('no-border')}
                        onBlur={(e) => e.target.classList.remove('no-border')}
                    />
                </div> */}
                <div className="dummy-explore-btn">

                </div>
                {/* <div className="explore-btn">Schedule Demo <img src={rightArrow} alt="" style={{ height: '12px', width: '10px', marginTop: '6px', marginLeft: '8px' }} /> </div> */}
                <div className="d-flex align-items-center">
                    <img src={emailIcon} alt="email" className="rounded-circle px-3" />
                    <img src={notificationIcon} alt="notification" className="rounded-circle px-3" />
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            {/* <img
                                src={UserIcon}
                                alt="profile"
                                className="rounded-circle border shadow-lg  bg-body-tertiary object-fit-fill "
                                style={{ height: '50px', width: '50px' }}
                            /> */}
                            <Avatar
                                name={superAdmin ? superAdmin.charAt(0).toUpperCase() : ""}
                                size="40" round={true}
                                fgColor="#FFF"
                                className="custom-avatar"
                            />

                            <img src={downArrow} alt="" style={{ height: '30px', width: '30px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '12px' }}>
                            <div className='d-flex p-2 user-view mb-3'>
                                <button class="position-relative" style={{ border: "none", backgroundColor: 'transparent' }}>
                                    {/* <img
                                        src={UserIcon}
                                        alt="profile"
                                        style={{ height: '60px', width: '60px' }}
                                        className='position-relative'></img> */}
                                    <Avatar
                                        name={superAdmin ? superAdmin.charAt(0).toUpperCase() : ""}
                                        size="60" round={true}
                                        fgColor="#FFF"
                                        className="custom-avatar"
                                    />
                                    <span class="position-absolute bottom-0  translate-middle p-2 bg-success border border-light rounded-circle">
                                        <span class="visually-hidden">New alerts</span>
                                    </span>
                                </button>
                                <div className='ps-3  '>
                                    <p className='name-label'>Hexalog <br /><span className='email-label'>{superAdmin}</span></p>
                                </div>
                            </div>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>View Profile</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Settings</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Support</p>
                            <div className="text-logout mb-2" onClick={() => setIsShow(true)}>Logout</div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {/* Mobile Topbar */}
            <div className="align-items-center px-4 py-4 pb-2 pb-lg-5 bg-white topbar-mobile">
                <img src={favicon} alt="logo" />
                <div className='d-flex'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '10px' }}>
                            <img
                                src={UserIcon}
                                alt="profile"
                                style={{ height: '55px', width: '55px' }}
                            />
                            <img src={downArrow} alt="" style={{ height: '30px', width: '30px' }} />

                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '12px' }}>
                            <div className='d-flex p-2 user-view mb-3'>
                                <button class="position-relative" style={{ border: "none", backgroundColor: 'transparent' }}>
                                    <img
                                        src={UserIcon}
                                        alt="profile"
                                        style={{ height: '60px', width: '60px' }}
                                        className='position-relative'></img>
                                    <span class="position-absolute bottom-0  translate-middle p-2 bg-success border border-light rounded-circle">
                                        <span class="visually-hidden">New alerts</span>
                                    </span>
                                </button>
                                <div className='ps-3 '>
                                    <p className='name-label'>Hexalog <br /><span className='email-label'>hexalog@admin.com</span></p>
                                </div>
                            </div>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>View profile</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Settings</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Support</p>
                            <div className="text-logout mb-2" onClick={handleLogout}>Log out</div>
                        </Dropdown.Menu>
                    </Dropdown>
                    <img
                        src={ismenu ? close : menu}
                        style={{
                            cursor: 'pointer',
                            width: ismenu ? '17px' : '30px',
                            height: ismenu ? '17px' : '30px',
                            marginTop: ismenu ? '20px' : '15px',
                        }}
                        onClick={handleOpenmenu}
                    />
                    {ismenu && (
                        <div className="mobile-topbar">
                            <div className="menu-item mb-3">
                                <img src={home} alt="Home Icon" />
                                <a href="/super-admin/dashboard" className="item-name ps-2">Dashboard</a>
                            </div>
                            <div className="menu-item mb-3">
                                <img src={user} alt="User Icon" />
                                <a href="/super-admin/users" className="item-name ps-2">Users</a>
                            </div>
                            <div className="menu-item mb-3">
                                <img src={users} alt="Users Icon" />
                                <a href="/super-admin/roles" className="item-name ps-2">Roles</a>
                            </div>
                            <div className="menu-item mb-3">
                                <img src={users} alt="Users Icon" />
                                <a href="/super-admin/categories" className="item-name ps-2">Document Category</a>
                            </div>
                            <div className="menu-item mb-3">
                                <img src={users} alt="Users Icon" />
                                <a href="/super-admin/orders" className="item-name ps-2">Orders</a>
                            </div></div>
                    )}
                </div>
                <LogoutModal show={isShow} handleClose={handleClose} handleDelete={handleLogout} />
            </div>
        </>
    );
};




export function UserTopBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isShowSheduleModal, setShowSheduleModal] = useState(false);
    const [ismenu, setMenu] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setShowSheduleModal(false);
    }

    const handleOpenmenu = () => {
        setMenu(prev => !prev);
        setDropdownOpen(false);
    }
    const handleLogout = (event) => {
        event.stopPropagation();
        setDropdownOpen(false);

        localStorage.removeItem("user-login-token");
        localStorage.removeItem("verificationStatus");
        navigate("/login");
    };
    const handleProfile = (event) => {
        event.stopPropagation();
        setDropdownOpen(false);
        navigate("/profile");
    }
    const handleChangePassword = (event) => {
        event.stopPropagation();
        setDropdownOpen(false);
        navigate("/changePassword");
    }

    const handleDashboard = () => {
        navigate('/dashboard')
    }
    const handleScheduleDemo = () => {
        setShowSheduleModal(false);
    }
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username")

    return (
        <>
            <div className="align-items-center px-5 py-1 bg-white topbar">
                <img src={logo} alt="logo" style={{ width: '160px', cursor: 'pointer' }} onClick={handleDashboard} />
                {/* <div className="input-group top-search-box  mx-5 w-50">
                    <span className="input-group-text bg-white border-0">
                        <img src={searchIcon} alt="" style={{ height: '16px' }} />
                    </span>
                    <input
                        type="text"
                        className="form-control custom-placeholder border-0"
                        placeholder="Type to search"
                        style={{ color: '#B4B4B4' }}
                        onFocus={(e) => e.target.classList.add('no-border')}
                        onBlur={(e) => e.target.classList.remove('no-border')}
                    />
                </div> */}
                <div className="d-flex align-items-center">
                    <div className="explore-btn" style={{ marginRight: '35px' }} onClick={() => setShowSheduleModal(true)}>Schedule Demo <img src={rightArrow} alt="" style={{ height: '12px', width: '10px', marginTop: '6px', marginLeft: '8px' }} /> </div>
                    <img src={emailIcon} alt="email" className="rounded-circle px-3" />
                    <img src={notificationIcon} alt="notification" className="rounded-circle px-3" />
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Avatar
                                name={username ? username.charAt(0).toUpperCase() : ""}
                                size="40" round={true}
                                fgColor="#FFF"
                                className="custom-avatar"
                            />
                            <img src={downArrow} alt="" style={{ height: '30px', width: '30px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '12px' }}>
                            <div className='d-flex p-2 user-view mb-3'>
                                {/* <img
                                    src={UserIcon}
                                    alt="profile"
                                    style={{ height: '60px', width: '60px' }}
                                /> */}
                                <Avatar
                                    name={username ? username.charAt(0).toUpperCase() : ""}
                                    size="50"
                                    round={true}
                                    fgColor="#FFFFFF"
                                    className="custom-avatar"
                                />
                                <div className='ps-3'>
                                    <p className='name-label'>{username} <br /><span className='email-label'>{email}</span></p>
                                </div>
                            </div>
                            <p className="dropdown-text" onClick={handleProfile}>View Profile</p>
                            <p className="dropdown-text" onClick={handleChangePassword}>Change Password</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Settings</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Support</p>
                            <div className="text-logout mb-2" onClick={handleLogout}>Logout</div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div >

            {/* Mobile version */}
            < div className=" align-items-center px-4 py-4 pb-2 pb-lg-5 bg-white topbar-mobile" >
                <img src={logo} alt="logo" style={{ width: '160px', cursor: 'pointer', height: '50px' }} onClick={handleDashboard} />
                <div className='d-flex gap-3'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '10px' }}>
                            <img
                                src={UserIcon}
                                alt="profile"
                                style={{ height: '50px', width: '50px' }}
                            />
                            <img src={downArrow} alt="" style={{ height: '30px', width: '30px' }} />

                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ borderRadius: '12px' }}>
                            <div className='d-flex p-2 user-view mb-3'>
                                <button class="position-relative" style={{ border: "none", backgroundColor: 'transparent' }}>
                                    <img
                                        src={UserIcon}
                                        alt="profile"
                                        style={{ height: '60px', width: '60px' }}
                                        className='position-relative'></img>

                                    <span class="position-absolute bottom-0  translate-middle p-2 bg-success border border-light rounded-circle">
                                        <span class="visually-hidden">New alerts</span>
                                    </span>
                                </button>
                                <div className='ps-3 '>
                                    <p className='name-label'>Hexalog <br /><span className='email-label'>hexalog@admin.com</span></p>
                                </div>
                            </div>
                            <p className="dropdown-text" onClick={handleProfile} >View profile</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Settings</p>
                            <p className="dropdown-text" onClick={() => setDropdownOpen(false)}>Support</p>
                            <div className="text-logout mb-2" onClick={handleLogout}>Log out</div>
                        </Dropdown.Menu>
                    </Dropdown>
                    <img
                        src={ismenu ? close : menu}

                        style={{
                            cursor: 'pointer',
                            width: ismenu ? '17px' : '30px',
                            height: ismenu ? '17px' : '30px',
                            marginTop: ismenu ? '20px' : '15px',
                        }}
                        onClick={handleOpenmenu}
                    />
                    {ismenu && (

                        <div className="mobile-topbar">

                            <div className="menu-item mb-3">
                                <img src={home} alt="Home Icon" />
                                <a href="/" className="item-name ps-2">Dashboard</a>
                            </div>
                            <div className="menu-item mb-3">
                                <img src={user} alt="User Icon" />
                                <a href="/" className="item-name ps-2">Users</a>
                            </div>
                            <div className="menu-item mb-3">
                                <img src={users} alt="Users Icon" />
                                <a href="/" className="item-name ps-2">Roles</a>
                            </div>
                            <div className="explore-btn mb-3">Schedule Demo</div>
                        </div>
                    )}
                </div>
                <ScheduleDemo show={isShowSheduleModal} handleClose={handleClose} handleSubmit={handleScheduleDemo} />
            </div >
        </>
    );
};


