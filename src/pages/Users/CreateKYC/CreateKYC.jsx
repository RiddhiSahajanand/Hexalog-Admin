


import { useState } from "react";
import logo from "../../../assets/hexalog-logo.png";
import Arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../config/config";
import toast from "react-hot-toast";
import contacticon from "../../../assets/contact-icon.png";
import ContactSupport from "../../../component/Modal/contactsupport/ContactSupport";


const CreateKYC = () => {

    const userRegisterToken = localStorage.getItem('user-register-token');
    const verificationStatus = localStorage.getItem('verificationStatus');

    console.log("userRegisterToken", userRegisterToken);


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gst_number: '',
        pan_number: '',
        account_number: '',
        ifsc_code: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [isGSTVerified, setIGSTVerified] = useState(false);
    const [isPANVerified, setIsPANVerified] = useState(false);
    const [isAccNoVerified, setIsAccNoVerified] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const handleClose = () => {
        setIsShow(false);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
        // validateForm();
        if (name === "gst_number") {
            setIGSTVerified(false);
        } else if (name === "pan_number") {
            setIsPANVerified(false);
        } else if (name === "account_number") {
            setIsAccNoVerified(false);
        }
    };


    const handleGSTVerify = async () => {
        if (formData.gst_number.length === 0) {
            setErrorMessage('Please enter gst number');
            return;
        }
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z0-9]{2}$/;

        if (!gstRegex.test(formData.gst_number)) {
            setErrorMessage('Please enter a valid GST number.');
            return;
        }

        try {
            const res = await Axios.post("/auth/gst-verify", {
                gst_number: formData.gst_number
            }, {
                headers: {
                    "access-token": `${userRegisterToken}`,
                    "Content-Type": "application/json"
                }
            });
            console.log("gst-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);
                setIGSTVerified(true);
                setErrorMessage("");
            }
            else {
                setErrorMessage(res.data.error)
            }
        } catch (err) {
            console.error("gst-Api++", err);
        }
    }

    const handlePANVerify = async () => {
        if (formData.pan_number.length === 0) {
            setErrorMessage('Please enter pan number');
            return;
        }
        const gstPanRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        if (!gstPanRegex.test(formData.pan_number)) {
            setErrorMessage('Please enter a valid PAN number.');
            return;
        }
        try {
            const res = await Axios.post("/auth/pan-verify", {
                pan_number: formData.pan_number
            }, {
                headers: {
                    "access-token": `${userRegisterToken}`,
                    "Content-Type": "application/json"
                }
            });
            console.log("pan-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);
                setIsPANVerified(true);
                setErrorMessage("");
            }
            else {
                setErrorMessage(res.data.error)
            }
        } catch (err) {
            console.error("pan-Api++", res);
        }
    }

    const handleAccountVerify = async () => {
        if (formData.account_number.length === 0) {
            setErrorMessage('Please enter account number');
            return;
        }
        const accountNumberRegex = /^[0-9]{11,16}$/;

        if (!accountNumberRegex.test(formData.account_number)) {
            setErrorMessage('Please enter a valid account number');
            return;
        }
        try {
            const res = await Axios.post("/auth/account-verify", {
                account_number: formData.account_number,
                ifsc_code: formData.ifsc_code
            }, {
                headers: {
                    "access-token": `${userRegisterToken}`,
                    "Content-Type": "application/json"
                }
            });
            console.log("account-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);
                setIsAccNoVerified(true);
                setErrorMessage("");
            }
            else {
                setErrorMessage(res.data.error)
            }
        } catch (err) {
            console.error("account-Api++", res);
        }
    }

    // const validateForm = () => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     const mobileRegex = /^[0-9]{9}$/;
    //     const isEmailValid = emailRegex.test(formData.email);
    //     const isMobileValid = mobileRegex.test(formData.mobile);

    //     setIsEmailVerified(isEmailValid);
    //     setIsMobileVerified(isMobileValid);
    // };

    const handleRegister = async () => {
        // Check if all fields are filled
        // if (!formData.organizationType || !formData.organizationName || !formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
        //     setErrorMessage('All fields are required.');
        //     return;
        // }
        // const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/;
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z0-9]{2}$/;
        const gstPanRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const accountNumberRegex = /^[0-9]{11,16}$/;
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

        if (!formData.gst_number) {
            setErrorMessage('Please enter gst number ');
            return;
        }
        if (!gstRegex.test(formData.gst_number)) {
            setErrorMessage('Please enter a valid GST number.');
            return;
        }
        if (!formData.pan_number) {
            setErrorMessage('Please pan number');
            return;
        }
        if (!gstPanRegex.test(formData.pan_number)) {
            setErrorMessage('Please enter a valid PAN number.');
            return;
        }
        if (!formData.account_number) {
            setErrorMessage('Please enter account number ');
            return;
        }
        if (!accountNumberRegex.test(formData.account_number)) {
            setErrorMessage('Please enter a valid account number');
            return;
        }
        if (!formData.ifsc_code) {
            setErrorMessage('Please ifsc code ');
            return;
        }
        if (!ifscRegex.test(formData.ifsc_code)) {
            setErrorMessage('Please enter a valid IFSC code');
            return;
        }
        if (isGSTVerified === false) {
            setErrorMessage('Please verified GST number ');
            return;
        } if (isPANVerified === false) {
            setErrorMessage('Please verified PAN number ');
            return;
        } if (isAccNoVerified === false) {
            setErrorMessage('Please verified account number ');
            return;
        }

        setErrorMessage('');
        localStorage.setItem("adminType", "superadmin");

        try {
            const res = await Axios.post("/auth/complete-profile", formData, {
                headers: {
                    "access-token": `${userRegisterToken}`,
                    "Content-Type": "application/json"
                }
            });
            console.log("CreateKYC-Api++", res);

            if (res.data.success) {
                toast.success(res.data.message);

                localStorage.setItem("verificationStatus", "COMPLETED");

                navigate('/welcome');
                // localStorage.setItem("UserToken", res.data.token)
            }
            else {
            }
        } catch (err) {
            console.error("CreateKYC-Api++", res);
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
        // navigate('/skipcreatekyc');
    }

    const handleSubmit = () => {
        setIsShow(false);
    }

    return (
        <>
            <div className="kyc-container">
                <div className="kyc-bg-two d-flex align-items-center">
                    <div className="container my-5 my-lg-0">
                        {/* <img src={logo} alt="" /> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <img src={logo} alt="" style={{ paddingTop: '100px' }} />
                            <img src={contacticon} className="register-cotact-icon" onClick={() => setIsShow(true)} />
                        </div>
                        <div className="row g-lg-5 ps-0 ps-lg-5 pt-3">
                            <div className="col-12 col-lg-6 pt-5 ps-5">
                                <div className="left-section">
                                    <div className="register-title">A digital Freight forwarding  <br /> Aggregation platform</div>
                                    <div className="register-more">Know More </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center"  >
                                <div className="right-section" style={{ width: '550px', height: '700px' }} >
                                    <p className="register-main-title fw-bold">Create Account</p>
                                    <p className="basic-detail-text">KYC & A/C Details</p>
                                    <form>
                                        <div className="space-y-4">
                                            <div className="form-group flex-column mb-3 position-relative">
                                                <input
                                                    type="text"
                                                    name="gst_number"
                                                    placeholder="GST Number"
                                                    value={formData.gst_number}
                                                    onChange={handleChange}
                                                    maxLength={15}
                                                    className={`form-control custom-input ${errorMessage && !formData.gst_number ? 'input-error' : ''}`}
                                                />
                                                <span
                                                    className="position-absolute"
                                                    style={{
                                                        top: '7px', right: '10px',
                                                        cursor: isGSTVerified ? "auto" : "pointer",
                                                        backgroundColor: isGSTVerified ? 'green' : '#9261E0',
                                                        paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
                                                        paddingBottom: '1px', borderRadius: '2px', color: '#fff'
                                                    }}
                                                    onClick={() => !isGSTVerified && handleGSTVerify()}
                                                >
                                                    {isGSTVerified ? 'Verified' : 'Verify'}
                                                </span>
                                            </div>
                                            <div className="form-group flex-column mb-3 position-relative">
                                                <input
                                                    type="text"
                                                    name="pan_number"
                                                    placeholder="PAN Number"
                                                    value={formData.pan_number}
                                                    onChange={handleChange}
                                                    maxLength={10}
                                                    className={`form-control custom-input ${errorMessage && !formData.pan_number ? 'input-error' : ''}`}
                                                />
                                                <span
                                                    className="position-absolute"
                                                    style={{
                                                        top: '7px', right: '10px',
                                                        cursor: isPANVerified ? "auto" : "pointer",
                                                        backgroundColor: isPANVerified ? 'green' : '#9261E0',
                                                        paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
                                                        paddingBottom: '1px', borderRadius: '2px', color: '#fff'
                                                    }}
                                                    onClick={() => !isPANVerified && handlePANVerify()}
                                                >
                                                    {isPANVerified ? 'Verified' : 'Verify'}
                                                </span>
                                            </div>
                                            <div className="form-group flex-column mb-3 position-relative">
                                                <input
                                                    type="text"
                                                    name="account_number"
                                                    placeholder="Account Number"
                                                    value={formData.account_number}
                                                    onChange={handleChange}
                                                    maxLength={17}
                                                    className={`form-control custom-input ${errorMessage && !formData.account_number ? 'input-error' : ''}`}
                                                />
                                                <span
                                                    className="position-absolute"
                                                    style={{
                                                        top: '7px', right: '10px',
                                                        cursor: isAccNoVerified ? "auto" : "pointer",
                                                        backgroundColor: isAccNoVerified ? 'green' : '#9261E0',
                                                        paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
                                                        paddingBottom: '1px', borderRadius: '2px', color: '#fff'
                                                    }}
                                                    onClick={() => !isAccNoVerified && handleAccountVerify()}
                                                >
                                                    {isAccNoVerified ? 'Verified' : 'Verify'}
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="ifsc_code"
                                                    placeholder="IFSC Code"
                                                    value={formData.ifsc_code}
                                                    maxLength={11}
                                                    className={`form-control custom-input ${errorMessage && !formData.ifsc_code ? 'input-error' : ''}`}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {errorMessage && (
                                                <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p>
                                            )}
                                            <a className="signup mb-4" onClick={handleRegister}>Save</a>
                                            <div className="border"></div>
                                            <div className="login-btn" onClick={handleRegister}>Next</div>

                                            <a className="forgot-password" onClick={handleSkip} >{`Skip and Continue later `}<img src={Arrow} alt=""
                                                style={{ width: '10px' }} />
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactSupport show={isShow} handleClose={handleClose} handleSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default CreateKYC;
