

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
import toast from "react-hot-toast";

import rightArrow from "../../../assets/right-Arrow.png";

const Forgotpassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // State for username

    const [errorMessage, setErrorMessage] = useState(''); // State for error message



    const handleOTP = async () => {
        if (!email) {
            setErrorMessage('Enter valid email address or mobile number');
            return;
        }

        // Regex patterns for basic validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[0-9]{10}$/; // At least 10-digit mobile numbers


        if (emailPattern.test(email) || mobilePattern.test(email)) {
            const data = {
                email: email,
                user_type: 3
            }
            console.log("data", data);

            try {
                const res = await Axios.post("/auth/forgot-password", data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("Forgot-Password-Api++", res);

                if (res.data.success) {
                    toast.success(res.data.message);

                    localStorage.setItem('loginType', emailPattern.test(email) ? 'email' : 'phone');
                    localStorage.setItem('loginValue', email);

                    navigate("/OtpVerification");
                }
                else {
                    toast.error(res.data.error);
                }
            } catch (err) {
                console.error("Forgot-Password-Api++", res);
            }
        }
        else {
            setErrorMessage('Enter a valid email address or mobile number');
        }

    };



    return (
        <>
            <div className="login-container">
                <div className="bg-two d-flex align-items-center">
                    <div className="container my-5 my-lg-0">
                        <img src={logo} alt="" />
                        <div className="row g-lg-5 ps-0 ps-lg-5">
                            <div className="col-12 col-lg-7 pt-5 ps-5">
                                {/* <img src={logo} alt="" /> */}
                                <div className="left-section ">
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

<div className="explore-btn">Schedule Demo <img src={rightArrow} alt="" style={{ height: '12px', width: '10px', marginTop: '6px', marginLeft: '8px' }} /> </div>

                                </div>
                            </div>

                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center px-5" style={{ width: '500px', height: '650px' }} >
                                <div className="right-section" style={{ width: '500px', height: '650px' }} >
                                    <p className="fw-bold forgot-title ">Forgot Password?</p>
                                    <p className="forgot-text">Enter your registered email address or mobile no. to receive an OTP and reset your password.</p>
                                    <form>
                                        <div className="form-group">
                                            <label for="email">Email / Mobile Number </label>
                                            <input
                                                type="text"
                                                placeholder="Enter your email address or mobile no."
                                                value={email}
                                                name="email"
                                                id="email"
                                                onChange={(e) => { setEmail(e.target.value), setErrorMessage("") }}
                                                className={`form-control custom-input ${errorMessage && !email ? 'input-error' : ''}`}
                                            />
                                        </div>
                                        {errorMessage && (
                                            <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p> // Display error message
                                        )}
                                        <div className="otp-btn" onClick={handleOTP}>Get OTP</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Forgotpassword;


