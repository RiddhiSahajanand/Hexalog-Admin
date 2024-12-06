


import { useState } from "react";
import logo from "../../../assets/hexalog-logo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FontAwesome icons
import { Axios } from "../../../config/config";
import contacticon from "../../../assets/contact-icon.png";

import toast from "react-hot-toast";
import ContactSupport from "../../../component/Modal/contactsupport/ContactSupport";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false); // For re-enter password visibility toggle
    const [isShow, setIsShow] = useState(false);

    const [formData, setFormData] = useState({
        type: '',
        organization_type: '',
        organization_name: '',
        individual_user: false,
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        user_type: 3,
        login_type: 1,
        role: "CUSTOMER"
    });
    console.log(formData);


    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isMobileVerified, setIsMobileVerified] = useState(false);


    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpType, setOtpType] = useState('');
    const [errorOtpMessage, setErrorOtpMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    const handleClose = () => {
        setIsShow(false);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateForm();
        setErrorMessage("");

        if (name === "email") {
            setIsEmailVerified(false);
        } else if (name === "mobile") {
            setIsMobileVerified(false);
        }
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{9}$/;
        const isEmailValid = emailRegex.test(formData.email);
        const isMobileValid = mobileRegex.test(formData.mobile);

        // setIsEmailVerified(isEmailValid);
        // setIsMobileVerified(isMobileValid);
    };


    const handleVerifyClick = async (type) => {
        console.log("type", formData.email.length);

        if (type === 'email' && formData.email.length === 0) {
            setErrorMessage('Please enter email');
            return; // Stop further execution if email is empty
        } else if (type === 'mobile' && formData.mobile.length === 0) {
            setErrorMessage('Please enter mobile');
            return; // Stop further execution if mobile is empty
        }

        if ((type === 'email' && formData.email) || (type === 'mobile' && formData.mobile)) {
            console.log("formData.email", formData.email.length);
            setOtpType(type);
            setShowOtpModal(true);
        }
        if (type === 'mobile' && formData.mobile) {
            console.log("formData.mobile", formData.mobile.length);

            try {
                const res = await Axios.post("auth/send-otp", {
                    [type === 'email' ? 'email' : 'phone']: `+91${formData.mobile}`,
                    resend: true
                });
                console.log("Otp-send-Api++", res);

                if (res.data.success) {
                    toast.success(res.data.message);


                }
                else {
                    toast.error(res.data.error);
                }
            } catch (err) {
                console.error("Otp-send-Api++", res);
            }
        }
    };


    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleOtpChange = (e, index) => {
        const { value } = e.target;

        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically focus on the next input
            if (value !== "" && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }

        setErrorOtpMessage("");
    }

    const handleOtpSubmit = async () => {

        const enteredOtp = otp.join("");
        console.log(enteredOtp);

        if (!enteredOtp) {
            setErrorOtpMessage('Enter Valid OTP');
            return;
        }

        try {
            const res = await Axios.post("/auth/otp-verify", {
                [otpType === 'email' ? 'email' : 'phone']: otpType === 'email' ? formData.email : `+91${formData.mobile}`,
                otp: enteredOtp,
                user_type: formData.user_type,
            });

            console.log(res);

            if (res.data.success) {
                toast.success(res.data.message);

                setShowOtpModal(false);
                if (otpType === 'email') setIsEmailVerified(true);
                if (otpType === 'mobile') setIsMobileVerified(true);

                setOtp(["", "", "", "", "", ""]);

                setErrorOtpMessage("");
                setErrorMessage("");

                setShowOtpModal(false);
            } else {
                // setErrorMessage('Invalid OTP');
                setErrorOtpMessage(res.data.error)
            }
        } catch (err) {
            setErrorMessage('Verification failed. Please try again.');
        }
    };


    const handleRegister = async () => {
        // Check if all fields are filled
        // if (!formData.organization_type || !formData.organization_name || !formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
        //     setErrorMessage('All fields are required.');
        //     return;
        // }

        if (!formData.type) {
            setErrorMessage('Please select Type ');
            return;
        }
        if (formData.type === 'organization') {
            if (!formData.organization_type) {
                setErrorMessage('Please select Organization Type');
                return;
            }

            if (!formData.organization_name) {
                setErrorMessage('Please enter Organization Name');
                return;
            }
        }
        if (!formData.name) {
            setErrorMessage('Please enter name ');
            return;
        }
        if (!formData.email) {
            setErrorMessage('Please enter email ');
            return;
        }
        if (!formData.mobile) {
            setErrorMessage('Please enter mobile ');
            return;
        }
        if (!formData.password || formData.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        if (!formData.confirmPassword || formData.confirmPassword.length < 8) {
            setErrorMessage('Confirm Password must be at least 8 characters long.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (isEmailVerified === false) {
            setErrorMessage('Please verified email ');
            return;
        }
        if (isMobileVerified === false) {
            setErrorMessage('Please verified mobile ');
            return;
        }

        // if (!isEmailVerified) {
        //     setErrorMessage('Please enter mobile ');
        //     return;
        // }

        // if (!isMobileVerified) {
        //     setErrorMessage('Please enter mobile ');
        //     return;
        // }


        // console.log("Register++", formData);

        const data = {
            organization_type: formData.organization_type,
            organization_name: formData.organization_name,
            individual_user: formData?.type === "individual" ? true : false,
            name: formData.name,
            email: formData.email,
            phone: formData.mobile,
            password: formData.password,
            user_type: formData.user_type,
            login_type: formData.login_type,
            role: formData.role,
        }
        console.log("data", data);

        try {
            const res = await Axios.post("/auth/register", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Register-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);

                navigate('/createkyc');

                localStorage.setItem("user-register-token", res.data.token)
            }
            else {
                toast.error(res.data.error);
                setIsMobileVerified(false);
                setIsEmailVerified(false);
            }
        } catch (err) {
            console.error("Register-Api++", res);
        }
        setErrorMessage('');
    };

    const handleSubmit = () => {
        setIsShow(false);
    }

    return (
        <>
            {/* <div className="register-container">
                <div className="register-bg-two d-flex ">
                    <div className="container my-5 my-lg-0">
                        {/* <div className="logo-view">
                            <img src={logo} alt="" />
                        </div> 
                        <div className="row g-5 ps-0 ps-lg-5 pt-lg-5">
                            <div className="col-12 col-lg-7">
                                <img src={logo} alt="" /> */}
            <div className="register-container">
                <div className="register-bg-two d-flex align-items-center">
                    <div className="container " style={{ marginTop: '50px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <img src={logo} alt="" style={{ paddingTop: '100px' }} />
                            <img src={contacticon} className="register-cotact-icon" onClick={() => setIsShow(true)} />
                        </div>
                        {/* <img src={logo} alt="" style={{ paddingTop: '100px' }} /> */}
                        <div className="row g-lg-5 ps-0 ps-lg-5 pt-5">
                            <div className="col-12 col-lg-6 pt-5 ps-5">
                                <div className="left-section ">
                                    <div className="register-title mt-4">An End-to-End Digital freight forwarding <br /> aggregation suite with core focus on CAAS..... </div>
                                    <div className="register-more">Know More </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center " style={{ marginTop: '20px' }} >
                                <div className="right-section" style={{ width: '550px', height: '850px' }} >
                                    <p className="register-main-title fw-bold">Create Account</p>
                                    <p className="basic-detail-text">Basic Details</p>
                                    <form>
                                        <div className="space-y-4">
                                            <div className="form-group">
                                                <select
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={handleChange}
                                                    className={`form-control custom-input ${errorMessage && !formData.type ? 'input-error' : ''}`}

                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="individual">Individual</option>
                                                    <option value="organization">Organization</option>
                                                </select>
                                            </div>
                                            {formData.type === 'organization' && (
                                                <>
                                                    <div className="form-group">
                                                        <select
                                                            name="organization_type"
                                                            value={formData.organization_type}
                                                            onChange={handleChange}
                                                            className={`form-control custom-input ${errorMessage && !formData.organization_type ? 'input-error' : ''}`}
                                                        >
                                                            <option value="">Organization Type</option>
                                                            <option value="ABC">ABC</option>
                                                            <option value="PQR">PQR</option>
                                                            <option value="XYZ">XYZ</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="organization_name"
                                                            placeholder="Organization Name"
                                                            value={formData.organization_name}
                                                            onChange={handleChange}
                                                            className={`form-control custom-input ${errorMessage && !formData.organization_name ? 'input-error' : ''}`}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                            {/* <div className="form-group">
                                                <select
                                                    name="organization_type"
                                                    value={formData.organization_type}
                                                    onChange={handleChange}
                                                    className={`form-control custom-input ${errorMessage && !formData.organization_type ? 'input-error' : ''}`}

                                                >
                                                    <option value="">Organization Type</option>
                                                    <option value="ABC">ABC</option>
                                                    <option value="PQR">PQR</option>
                                                    <option value="XYZ">XYZ</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="organization_name"
                                                    placeholder="Organization Name"
                                                    value={formData.organization_name}
                                                    onChange={handleChange}
                                                    className={`form-control custom-input ${errorMessage && !formData.organization_name ? 'input-error' : ''}`}
                                                />
                                            </div> */}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`form-control custom-input ${errorMessage && !formData.name ? 'input-error' : ''}`}
                                                />
                                            </div>
                                            <div className="d-flex form-group flex-column mb-3 position-relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email ID"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`form-control custom-input ${errorMessage && !formData.email ? 'input-error' : ''}`}

                                                />
                                                <span
                                                    className="position-absolute"
                                                    style={{
                                                        top: '7px', right: '10px', cursor: 'pointer',
                                                        backgroundColor: isEmailVerified ? 'green' : '#9261E0',
                                                        paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
                                                        paddingBottom: '1px', borderRadius: '2px', color: '#fff'
                                                    }}
                                                    onClick={() => !isEmailVerified && handleVerifyClick('email')}
                                                >
                                                    {isEmailVerified ? 'Verified' : 'Verify'}
                                                </span>
                                            </div>
                                            <div className="d-flex form-group flex-column mb-3 position-relative">
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    placeholder="Mobile Number"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    maxLength={16}
                                                    className={`form-control custom-input ${errorMessage && !formData.mobile ? 'input-error' : ''}`}
                                                />
                                                <span
                                                    className="position-absolute"
                                                    style={{
                                                        top: '7px', right: '10px', cursor: 'pointer',
                                                        backgroundColor: isMobileVerified ? 'green' : '#9261E0',
                                                        paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
                                                        paddingBottom: '1px', borderRadius: '2px', color: '#fff'
                                                    }}
                                                    onClick={() => !isMobileVerified && handleVerifyClick('mobile')}
                                                >
                                                    {isMobileVerified ? 'Verified' : 'Verify'}
                                                </span>
                                            </div>
                                            <div className="d-flex form-group flex-column mb-3 position-relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control custom-input ${errorMessage && !formData.password ? 'input-error' : ''}`}
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    minLength={9}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                />
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="position-absolute"
                                                    style={{ top: '8px', right: '10px', cursor: 'pointer' }}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            <div className="d-flex form-group flex-column mb-3 position-relative">
                                                <input
                                                    type={showRePassword ? "text" : "password"}
                                                    className={`form-control custom-input ${errorMessage && !formData.confirmPassword ? 'input-error' : ''}`}
                                                    placeholder="Re-enter New Password"
                                                    value={formData.confirmPassword}
                                                    minLength={9}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                />
                                                <span
                                                    onClick={toggleRePasswordVisibility}
                                                    className="position-absolute"
                                                    style={{ top: '8px', right: '10px', cursor: 'pointer' }}
                                                >
                                                    {showRePassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {errorMessage && (
                                                <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p>
                                            )}
                                            <a className="signup mb-4" onClick={handleRegister}>Save</a>
                                            <div className="border-custom my-5"></div>
                                            <div className="login-btn" onClick={handleRegister}>Next</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >


                {/* Otp-Model */}
                {showOtpModal && (
                    <div className="overlay" onClick={(e) => {
                        if (e.target.classList.contains('overlay')) {
                            setShowOtpModal(false);
                        }
                    }}>
                        <div className="right-section" style={{ width: '490px', }}>
                            <div className="otp-modal">
                                {/* <h3>Enter OTP</h3> */}
                                <p class="register-main-title fw-bold">Enter OTP</p>
                                <p class="basic-detail-text">Enter {otpType === 'email' ? "Email " : "Mobile number "}OTP</p>
                                <input
                                    type="text"
                                    value={otp}
                                    className="d-none"
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                />
                                {/* <div> */}
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"
                                        name="otp"
                                        className="otp-input a me-2"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                        autoFocus={index === 0}
                                    />
                                ))}
                                {errorOtpMessage && (
                                    <p className="text-center mt-4" style={{ color: '#F62D2D' }}>{errorOtpMessage}</p>
                                )}
                                {/* </div> */}
                                <div class="login-btn" onClick={handleOtpSubmit}>Submit</div>
                                {/* <button >Submit</button> */}
                                {/* <button onClick={() => setShowOtpModal(false)}>Close</button> */}
                            </div>
                        </div>
                    </div>
                )}
                <ContactSupport show={isShow} handleClose={handleClose} handleSubmit={handleSubmit} />

            </div>

        </>
    );
};

export default Register;
