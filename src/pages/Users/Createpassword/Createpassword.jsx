
import { useState } from "react";
import logo from "../../../assets/hexalog-logo.png";
import LogisticIcon from "../../../assets/Logistic.png";
import financeIcon from "../../../assets/Receive Dollar.png";
import TradeIcon from "../../../assets/Hierarchy.png";
import GlobleIcon from "../../../assets/Globe Network.png";
import Arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Axios } from "../../../config/config";
import toast from "react-hot-toast";
import rightArrow from "../../../assets/right-Arrow.png";
import contacticon from "../../../assets/contact-icon.png";
import ContactSupport from "../../../component/Modal/contactsupport/ContactSupport";
import ScheduleDemo from "../../../component/Modal/scheduledemo/ScheduleDemo";

const Createpassword = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // For new password visibility toggle
    const [showRePassword, setShowRePassword] = useState(false); // For re-enter password visibility toggle

    const [password, setPassword] = useState(''); // State for new password
    const [rePassword, setRePassword] = useState(''); // State for re-entered password

    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [isShow, setIsShow] = useState(false);
    const [isShowSheduleModal, setShowSheduleModal] = useState(false);

    const typeValue = localStorage.getItem('loginType');
    const loginValue = localStorage.getItem('loginValue');

    const handleClose = () => {
        setIsShow(false);
        setShowSheduleModal(false);

    }

    // Function to toggle password visibility for New Password field
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to toggle password visibility for Re-enter Password field
    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!password || !rePassword) {
            setErrorMessage('Please enter password');
            return;
        }
        if (password !== rePassword) {
            setErrorMessage('Password do not match');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be exactly 8 characters');
            return;
        }

        const data = {
            email: loginValue,
            password: password,
            user_type: 3,
        }

        console.log(data);


        try {
            const res = await Axios.post("/auth/reset-password", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Reset-Password-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);

                setErrorMessage('');

                navigate("/login");
            }
            else {
                toast.error(res.data.error);
            }
        } catch (err) {
            console.error("Reset-Password++", err);
        }


        console.log('Passwords match. Proceed with the logic.');
        // Optionally navigate to another page
        // navigate('/some-page');
    };

    const handleConatctSubmit = () => {
        setIsShow(false);
    }
    const handleScheduleDemo = () => {
        setShowSheduleModal(false);
    }
    return (
        <>
            <div className="login-container">
                <div className="bg-two d-flex align-items-center">
                    <div className="container my-5 my-lg-0">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <img src={logo} alt="" />
                            <img src={contacticon} className="cotact-icon" onClick={() => setIsShow(true)} />
                        </div>
                        <div className="row g-lg-5 ps-0 ps-lg-5 pt-3">
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
                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center" >
                                <div className="right-section" style={{ width: '550px', height: '650px' }} >
                                    <p className="create-password-title">Create Password</p>
                                    <p className="create-password-text ">Enter a new password to log in to your account!</p>
                                    <form>
                                        <div className="d-flex form-group flex-column mb-3 position-relative">
                                            <label htmlFor="password" className="mb-1 label">New Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`form-control custom-input ${errorMessage && !password ? 'input-error' : ''}`}
                                                placeholder="Enter new password"
                                                id="password"
                                                value={password}
                                                minLength={9}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setErrorMessage(''); // Clear error message on input change
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
                                                className={`form-control custom-input ${errorMessage && !rePassword ? 'input-error' : ''}`}
                                                placeholder="Re-enter new password"
                                                id="rePassword"
                                                value={rePassword}
                                                minLength={9}
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

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactSupport show={isShow} handleClose={handleClose} handleSubmit={handleConatctSubmit} />
                <ScheduleDemo show={isShowSheduleModal} handleClose={handleClose} handleSubmit={handleScheduleDemo} />

            </div>
        </>
    )
}

export default Createpassword;



