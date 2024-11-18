
import { useState, useEffect } from "react";
import logo from "../../../assets/hexalog-logo.png";
import LogisticIcon from "../../../assets/Logistic.png";
import financeIcon from "../../../assets/Receive Dollar.png";
import TradeIcon from "../../../assets/Hierarchy.png";
import GlobleIcon from "../../../assets/Globe Network.png";
import Arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../config/config";
import toast from "react-hot-toast";

const LoginOTP = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [inputError, setInputError] = useState(false);
    const [mobileLastFour, setMobileLastFour] = useState('');
    const [loginType, setLoginType] = useState('');

    const [timer, setTimer] = useState(120); // Countdown timer state

    // const [state, setstate] = useState("");

    const fixedOtp = "123456"; // Define fixed OTP here

    useEffect(() => {
        // Retrieve the mobile number and login type from localStorage
        const loginValue = localStorage.getItem('loginValue');

        const typeValue = localStorage.getItem('loginType'); // Assuming the key for login type is 'loginType'


        if (loginValue && loginValue.length >= 4) {
            // Get the last four digits of the mobile number
            setMobileLastFour(loginValue);
        }

        if (typeValue) {
            setLoginType(typeValue); // Set the login type
        }
    }, []);

    useEffect(() => {
        // Countdown timer logic
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    const handleClick = (index) => {
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the clicked input box
        setOtp(newOtp);
        setErrorMessage('');
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index] === "") {
                if (index > 0) {
                    newOtp[index - 1] = ""; // Clear the previous box if current is empty
                    setOtp(newOtp);
                    event.target.previousSibling.focus(); // Move to the previous input
                }
            } else {
                newOtp[index] = ""; // Clear the current box
                setOtp(newOtp);
            }
        }
    };
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        // Update the OTP state
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        setErrorMessage('');

        // Focus on the next input if value is entered
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const resendOtp = async () => {
        setTimer(120); // Reset the countdown

        // navigate("/ForgottPassword");

        try {
            const res = await Axios.post("auth/send-otp", {
                // [loginType === 'email' ? 'email' : 'phone']: mobileLastFour,
                [loginType]: mobileLastFour,
                resend: true
            });
            console.log("Otp-Resend-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.error);
            }
        } catch (err) {
            console.error("Otp-Resend-Api++", res);
        }


    }

    const handleSubmit = async () => {
        // Combine OTP array into a single string
        // const otpValue = otp.join("");
        // console.log("OTP entered:", otpValue);

        // if (otpValue.length < 6) {
        //     setErrorMessage("Enter Valid OTP");
        //     setInputError(true);  // Trigger error state for input boxes
        // } else {
        //     // Handle OTP verification logic here
        //     setErrorMessage("");
        //     console.log("Verifying OTP...");
        //     setInputError(false); // Reset error state for input boxes
        //     navigate("/createPassword");
        // }
        const otpValue = otp.join("");
        console.log(otpValue);



        // if (otpValue !== fixedOtp) {
        //     setErrorMessage("Enter valid OTP");
        //     setInputError(true); // Apply error state for input boxes
        // }
        // else {
        // }

        try {
            const res = await Axios.post("/auth/otp-verify", {
                // [loginType === 'email' ? 'email' : 'phone']: mobileLastFour,
                [loginType]: mobileLastFour,
                otp: otpValue,
                user_type: 3,
            });
            console.log("Otp-Verify-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);

                setErrorMessage("");
                setInputError(false);

                navigate("/createPassword");
            }
            else {
                // toast.error(res.data.error);
                setErrorMessage(res.data.error);
            }
        } catch (err) {
            console.error("Otp-Verify-Api++", res);
        }

    };

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
                                    <div className="schedule-demo">Schedule Demo <img src={Arrow} alt="" style={{ width: '10px' }} /></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center px-5" style={{ width: '550px', height: '700px' }} >
                                <div className="right-section" style={{ width: '550px', height: '700px' }} >
                                    <p className="fw-bold forgot-title ">Enter the <span className="digit">6-digit OTP </span> you just received</p>
                                    <p className="otp-text-one">
                                        We have sent a 6-digit OTP on <span className="highlight">{mobileLastFour} </span>
                                        and registered {loginType},
                                        Please sign up if you are a new user.
                                    </p>
                                    <p className="otp-text-two">Did not receive the OTP in <span className="highlight">{timer}  </span> seconds? Click on
                                        <span
                                            // className="highlight"
                                            // style={{ cursor: 'pointer' }}
                                            className={`${timer === 0 ? "highlight" : "disabel"}`}
                                            style={{
                                                cursor: timer === 0 ? 'pointer' : 'auto',
                                            }}
                                            onClick={timer === 0 && resendOtp} >
                                            Resend OTP
                                        </span>
                                    </p>

                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="username">Enter OTP </label>
                                            <div className="d-flex justify-content-between otp-boxes">
                                                {otp.map((data, index) => (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        name="otp"
                                                        maxLength="1"
                                                        className={`otp-input ${errorMessage ? 'input-error' : ''}`} // Apply red border on error
                                                        value={data}
                                                        onClick={() => handleClick(index)}
                                                        onChange={(e) => handleChange(e.target, index)}
                                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                                        onFocus={(e) => e.target.select()}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {errorMessage && (
                                            <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p> // Display error message
                                        )}
                                        <div className="otp-btn" onClick={handleSubmit}>Verify OTP</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default LoginOTP;
