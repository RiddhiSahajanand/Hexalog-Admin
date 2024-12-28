

import { useState } from "react";
import logo from "../../../assets/hexalog-logo.png";
import LogisticIcon from "../../../assets/Logistic.png";
import financeIcon from "../../../assets/Receive Dollar.png";
import TradeIcon from "../../../assets/Hierarchy.png";
import GlobleIcon from "../../../assets/Globe Network.png";
import Arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FontAwesome icons
import { Axios } from "../../../config/config";
import rightArrow from "../../../assets/right-Arrow.png";
import contacticon from "../../../assets/contact-icon.png";
import toast from "react-hot-toast";
import ContactSupport from "../../../component/Modal/contactsupport/ContactSupport";
import ScheduleDemo from "../../../component/Modal/scheduledemo/ScheduleDemo";


const Login = () => {

    const naviagte = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isShowSheduleModal, setShowSheduleModal] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        login_type: 1,
        user_type: 3
    })
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClose = () => {
        setIsShow(false);
        setShowSheduleModal(false);
    }

    const staticUsername = "test@gmail.com";
    const staticPassword = "1234";


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === username || value.length > 30) {
            setErrorMessage("Username must be 40 characters")
            return;
        }
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
    };

    // Function to handle login
    // const handleLogin = async () => {
    //     if (!formData.username) {
    //         setErrorMessage('Enter valid username or password'); // Display error if username is empty
    //         return;
    //     }
    //     if (!formData.password) {
    //         setErrorMessage('Enter valid username or password'); // Display error if password is empty
    //         return;
    //     }

    //     try {
    //         const res = await Axios.post("/auth/login", formData, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (res.data.success) {
    //             toast.success(res.data.message);
    //             naviagte("/dashboard");
    //             localStorage.setItem("userId", res?.data?.user?.id)
    //             localStorage.setItem("user-login-token", res.data.token)
    //         }
    //         else {
    //             toast.error(res.data.error);
    //         }
    //     } catch (err) {
    //         console.error("Login-Api++", res);
    //     }
    // };
    const emailRegex = /^[^\s@]+@[a-z]+\.[a-z]{2,}$/; // Simple regex for lowercase emails


    const validateInputs = () => {
        if (!formData.username || !formData.password) {
            return "Enter valid username or password.";
        }
        if (!emailRegex.test(formData.username)) {
            return "Please enter a valid email.";
        }
        if (formData.username.length > 40) {
            return "Username must be 40 characters or less.";
        }
        if (formData.password.length < 8) {
            return "Password must be 8 characters";
        }
        return "";
    };

    const handleLogin = async () => {
        const validationError = validateInputs();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const res = await Axios.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                naviagte("/dashboard");
                localStorage.setItem("userId", res?.data?.user?.id);
                localStorage.setItem("user-login-token", res.data.token);
                localStorage.setItem("verificationStatus", res.data.user.verificationStatus);
                localStorage.setItem("username", res.data.user.name);
                localStorage.setItem("email", res.data.user.email)


            } else {
                toast.error(res.data.error);
            }
        } catch (err) {
            console.error("Login-Api Error:", err);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };


    const handleForgottpssword = () => {
        naviagte("/ForgottPassword")
    }
    const handleSignup = () => {
        naviagte("/register")
    }
    const handleSubmit = () => {
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
                                            <div className="fw-medium feture-text">End to End <br />Logistics</div>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={financeIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feture-text">Finance & <br />Compliance</div>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={TradeIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feture-text">Trade <br /> Management</div>
                                        </div>
                                        <div className="feature">
                                            <div className="feature-icon">
                                                <img src={GlobleIcon} alt="" className="icon-box" />
                                            </div>
                                            <div className="fw-medium feture-text">Global <br /> Network</div>
                                        </div>
                                    </div>
                                    {/* <div className="schedule-demo">Schedule Demo <img src={Arrow} alt=""
                                        style={{ width: '10px' }} /></div> */}
                                    <div className="explore-btn" onClick={() => setShowSheduleModal(true)} >Schedule Demo <img src={rightArrow} alt="" style={{ height: '12px', width: '10px', marginTop: '6px', marginLeft: '8px' }} /> </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center "   >
                                <div>
                                    <div className="right-section" style={{ width: '450px', height: '650px' }} >
                                        <h2 className="fw-bold">Welcome!</h2>
                                        <form>
                                            <div className="form-group">
                                                <label for="username">Username</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your username"
                                                    id="username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className={`form-control custom-input ${errorMessage && !formData.username ? 'input-error' : ''}`}
                                                />
                                            </div>
                                            <div className="d-flex form-group flex-column mb-3 position-relative">
                                                <label htmlFor="password" className="mb-1 label">Password</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control custom-input ${errorMessage && !formData.password ? 'input-error' : ''}`}
                                                    placeholder="Enter password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    maxLength={8}
                                                />
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="position-absolute"
                                                    style={{ top: '35px', right: '10px', cursor: 'pointer' }}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {errorMessage && (
                                                <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p> // Display error message
                                            )}
                                            <div className="login-btn" onClick={handleLogin}>Login</div>

                                            <a className="forgot-password" onClick={handleForgottpssword}>Forgot password?</a>

                                            <div className="my-5 border-custom"></div>

                                            <a className="signup" onClick={handleSignup}>Signup</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactSupport show={isShow} handleClose={handleClose} handleSubmit={handleSubmit} />
                <ScheduleDemo show={isShowSheduleModal} handleClose={handleClose} handleSubmit={handleScheduleDemo} />
            </div>
        </>
    )
}
export default Login;


