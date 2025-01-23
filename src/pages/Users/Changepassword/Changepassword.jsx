import { useState } from "react";
import logo from "../../../assets/hexalog-logo.png";
import LogisticIcon from "../../../assets/Logistic.png";
import financeIcon from "../../../assets/Receive Dollar.png";
import TradeIcon from "../../../assets/Hierarchy.png";
import rightArrow from "../../../assets/right-Arrow.png";

import GlobleIcon from "../../../assets/Globe Network.png";
import Arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Axios } from "../../../config/config";
import toast from "react-hot-toast";
import ScheduleDemo from "../../../component/Modal/scheduledemo/ScheduleDemo";

const Changepassword = () => {

    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // For new password visibility toggle
    const [showRePassword, setShowRePassword] = useState(false); // For re-enter password visibility toggle
    const [isShowSheduleModal, setShowSheduleModal] = useState(false);


    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState(''); // State for new password
    const [rePassword, setRePassword] = useState(''); // State for re-entered password

    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const typeValue = localStorage.getItem('loginType');
    const loginValue = localStorage.getItem('loginValue');
    const userId = localStorage.getItem('userId');

    const handleClose = () => {
        setShowSheduleModal(false);
    }

    // Function to toggle password visibility for New Password field
    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to toggle password visibility for Re-enter Password field
    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    // Function to handle form submission
    // const handleSubmit = async () => {
    //     if (!oldPassword || !password || !rePassword) {
    //         setErrorMessage('Please enter password');
    //         return;
    //     }
    //     if (password !== rePassword) {
    //         setErrorMessage('Password do not match');
    //         return;
    //     }
    //     if (password.length < 8 || password.length > 8) {
    //         setErrorMessage('Password must be exactly 8 characters');
    //         return;
    //     }


    //     const data = {
    //         updated_password: password,
    //     }

    // };


    const handleSubmit = async () => {
        // Validate input fields
        if (!oldPassword || !password || !rePassword) {
            setErrorMessage('Please enter all password fields');
            return;
        }
        if (password !== rePassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be exactly 8 characters');
            return;
        }

        const data = {
            old_password: oldPassword,
            updated_password: password,
        };

        const token = localStorage.getItem('user-login-token'); // Get the access token

        try {
            const response = await Axios.patch(`/users/${userId}/password`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': `${token}`,
                    },
                }
            );

            if (response?.data?.status) {
                toast.success(response.data.message);
                setErrorMessage(''); // Clear any previous error messages
                setOldPassword('');
                setPassword('');
                setRePassword('');
                navigate("/dashboard");
            } else {
                setErrorMessage(response.data.error);

            }
        } catch (error) {
            console.error('Error updating password:', error);

            if (error.response.data.success === false) {
                // alert(error.response.data.message);

                toast.error(error.response.data.message);

                navigate("/login");
            }
        }
    };
    const handleScheduleDemo = () => {
        setShowSheduleModal(false);
    }

    return (
        <>
            <div className="login-container">
                <div className="bg-two d-flex align-items-center">
                    <div className="container my-5 my-lg-0">
                        <img src={logo} alt="" />
                        <div className="row g-lg-5 ps-0 ps-lg-5">
                            <div className="col-12 col-lg-6 pt-5 ps-5">
                                <div className="left-section">
                                    <div className="tagline">AMPLIFYING BUSINESS</div>
                                    <div className="tagline bg-color-2nd">BEYOND BOUNDARIES</div>

                                    <div className="features my-5">
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={LogisticIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feature-text">End to End <br />Logistics</div>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={financeIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feature-text">Finance & <br />Compliance</div>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={TradeIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feature-text">Trade <br /> Management</div>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={GlobleIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feature-text">Global <br /> Network</div>
                                        </div>
                                    </div>
                                    {/* <div className="schedule-demo">Schedule Demo <img src={Arrow} alt="" style={{ width: '10px' }} /></div> */}
                                    <div className="explore-btn" onClick={() => setShowSheduleModal(true)}>Schedule Demo <img src={rightArrow} alt="" style={{ height: '12px', width: '10px', marginTop: '6px', marginLeft: '8px' }} /> </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                                <div className="right-section" style={{ width: '550px', height: '650px' }} >
                                    <p className="change-password-title">Change Password</p>
                                    <p className="change-password-text ">Enter a new password to change Password!</p>
                                    <form>
                                        <div className="d-flex form-group flex-column mb-3 position-relative">
                                            <label htmlFor="password" className="mb-1 label">Old Password</label>
                                            <input
                                                type={showOldPassword ? "text" : "password"}
                                                className={`form - control custom - input ${errorMessage && !oldPassword ? 'input-error' : ''}`}
                                                placeholder="Enter old password"
                                                id="oldPassword"
                                                value={oldPassword}
                                                onChange={(e) => {
                                                    setOldPassword(e.target.value);
                                                    setErrorMessage('');
                                                }}
                                            />
                                            <span
                                                onClick={toggleOldPasswordVisibility}
                                                className="position-absolute"
                                                style={{ top: '35px', right: '10px', cursor: 'pointer' }}
                                            >
                                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        <div className="d-flex form-group flex-column mb-3 position-relative">
                                            <label htmlFor="password" className="mb-1 label">New Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`form - control custom - input ${errorMessage && !password ? 'input-error' : ''} `}
                                                placeholder="Enter new password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setErrorMessage('');
                                                }}
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className="position-absolute"
                                                style={{ top: '35px', right: '10px', cursor: 'pointer' }}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>

                                        <div className="d-flex form-group flex-column mb-3 position-relative">
                                            <label htmlFor="rePassword" className="mb-1 label">Re-enter New Password</label>
                                            <input
                                                type={showRePassword ? "text" : "password"}
                                                className={`form - control custom - input ${errorMessage && !rePassword ? 'input-error' : ''} `}
                                                placeholder="Re-enter new password"
                                                id="rePassword"
                                                value={rePassword}
                                                onChange={(e) => {
                                                    setRePassword(e.target.value);
                                                    setErrorMessage(''); // Clear error message on input change
                                                }}
                                            />
                                            <span
                                                onClick={toggleRePasswordVisibility}
                                                className="position-absolute"
                                                style={{ top: '35px', right: '10px', cursor: 'pointer' }}
                                            >
                                                {showRePassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>

                                        {errorMessage && (
                                            <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p>
                                        )}
                                        <div className="create-password-btn" onClick={handleSubmit}>Submit</div>
                                        <ScheduleDemo show={isShowSheduleModal} handleClose={handleClose} handleSubmit={handleScheduleDemo} />

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Changepassword;



