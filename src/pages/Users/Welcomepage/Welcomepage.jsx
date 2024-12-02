

import logo from "../../../assets/hexalog-logo.png";
import { useNavigate } from "react-router-dom";
import { UserTopBar } from '../../../component/Topbar/Topbar';
import Arrow from "../../../assets/arrow.png";
import { Axios } from '../../../config/config';
import toast from 'react-hot-toast';
import { useState } from "react";



const Welcomepage = () => {

    const naviagte = useNavigate();
    const handleExplore = () => {
        naviagte("/dashboard")
    }


    const userRegisterToken = localStorage.getItem('user-register-token');
    const verificationStatus = localStorage.getItem('verificationStatus');
    console.log(verificationStatus);


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
        // validateForm();
    };


    const handleGSTVerify = async () => {
        if (formData.gst_number.length === 0) {
            setErrorMessage('Please enter gst number');
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

            if (err.response.data.success === false) {
                // alert(err.response.data.message);

                toast.error(err.response.data.message);

                navigate("/login");
            }
        }
    }

    const handlePANVerify = async () => {
        if (formData.pan_number.length === 0) {
            setErrorMessage('Please enter pan number');
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
            console.error("pan-Api++", err);

            if (err.response.data.success === false) {
                // alert(err.response.data.message);

                toast.error(err.response.data.message);

                navigate("/login");
            }
        }
    }

    const handleAccountVerify = async () => {
        if (formData.account_number.length === 0) {
            setErrorMessage('Please enter account number');
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

            if (err.response.data.success === false) {
                // alert(err.response.data.message);

                toast.error(err.response.data.message);

                navigate("/login");
            }
        }
    }

    const handleRegister = async () => {

        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/;
        const gstPanRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const accountNumberRegex = /^[0-9]{11,16}$/;
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

        if (!formData.gst_number) {
            setErrorMessage('Please enter gst number ');
            return;
        }
        if (!gstRegex.test(formData.gst_number)) {
            setErrorMessage('Please enter a valid GST number in the format 29GGGGG1314R9Z6');
            return;
        }
        if (!formData.pan_number) {
            setErrorMessage('Please pan number ');
            return;
        }
        if (!gstPanRegex.test(formData.pan_number)) {
            setErrorMessage('Please enter a valid PAN number in the format ABCDE1234N');
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

            if (err.response.data.success === false) {
                // alert(err.response.data.message);

                toast.error(err.response.data.message);

                navigate("/login");
            }
        }
    };




    return (
        <>
            <div className="welcome-container">
                <div className="welcome-bg-two d-flex ">
                    <div className="container my-5">
                        <img src={logo} alt="" />

                        <div className="d-flex justify-content-center">
                            <div>
                                <p className="welcome-title">Welcome!!</p>
                                <div className="explore-btn" onClick={handleExplore}>Explore Platform</div>
                            </div>
                        </div>









                    </div>
                </div >
                <div className="welcome-bg-three d-flex">
                </div>
            </div >
        </>
    )
}
export default Welcomepage;




// {
//     verificationStatus === "PENDING" ? (
//         <>
//             <div className="d-flex justify-content-center align-items-center px-5" >
//                 <div style={{ width: '550px', height: '530px' }} >

//                     <div className="right-section" style={{ width: '550px', height: '530px' }} >
//                         <p className="register-main-title fw-bold">Complete Your KYC</p>
//                         <p className="basic-detail-text">KYC & A/C Details</p>
//                         <form>
//                             <div className="space-y-4">
//                                 <div className="form-group flex-column mb-3 position-relative">
//                                     <input
//                                         type="text"
//                                         name="gst_number"
//                                         placeholder="GST Number"
//                                         value={formData.gst_number}
//                                         onChange={handleChange}
//                                         maxLength={15}
//                                         className={`form-control custom-input ${errorMessage && !formData.gst_number ? 'input-error' : ''}`}
//                                     />
//                                     <span
//                                         className="position-absolute"
//                                         style={{
//                                             top: '7px', right: '10px',
//                                             cursor: isGSTVerified ? "auto" : "pointer",
//                                             backgroundColor: isGSTVerified ? 'green' : '#9261E0',
//                                             paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
//                                             paddingBottom: '1px', borderRadius: '2px', color: '#fff'
//                                         }}
//                                         onClick={() => !isGSTVerified && handleGSTVerify()}
//                                     >
//                                         {isGSTVerified ? 'Verified' : 'Verify'}
//                                     </span>
//                                 </div>
//                                 <div className="form-group flex-column mb-3 position-relative">
//                                     <input
//                                         type="text"
//                                         name="pan_number"
//                                         placeholder="PAN Number"
//                                         value={formData.pan_number}
//                                         onChange={handleChange}
//                                         maxLength={10}
//                                         className={`form-control custom-input ${errorMessage && !formData.pan_number ? 'input-error' : ''}`}
//                                     />
//                                     <span
//                                         className="position-absolute"
//                                         style={{
//                                             top: '7px', right: '10px',
//                                             cursor: isPANVerified ? "auto" : "pointer",
//                                             backgroundColor: isPANVerified ? 'green' : '#9261E0',
//                                             paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
//                                             paddingBottom: '1px', borderRadius: '2px', color: '#fff'
//                                         }}
//                                         onClick={() => !isPANVerified && handlePANVerify()}
//                                     >
//                                         {isPANVerified ? 'Verified' : 'Verify'}
//                                     </span>
//                                 </div>
//                                 <div className="form-group flex-column mb-3 position-relative">
//                                     <input
//                                         type="text"
//                                         name="account_number"
//                                         placeholder="Account Number"
//                                         value={formData.account_number}
//                                         onChange={handleChange}
//                                         maxLength={17}
//                                         className={`form-control custom-input ${errorMessage && !formData.account_number ? 'input-error' : ''}`}
//                                     />
//                                     <span
//                                         className="position-absolute"
//                                         style={{
//                                             top: '7px', right: '10px',
//                                             cursor: isAccNoVerified ? "auto" : "pointer",
//                                             backgroundColor: isAccNoVerified ? 'green' : '#9261E0',
//                                             paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px',
//                                             paddingBottom: '1px', borderRadius: '2px', color: '#fff'
//                                         }}
//                                         onClick={() => !isAccNoVerified && handleAccountVerify()}
//                                     >
//                                         {isAccNoVerified ? 'Verified' : 'Verify'}
//                                     </span>
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         name="ifsc_code"
//                                         placeholder="IFSC Code"
//                                         value={formData.ifsc_code}
//                                         maxLength={11}
//                                         className={`form-control custom-input ${errorMessage && !formData.ifsc_code ? 'input-error' : ''}`}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 {errorMessage && (
//                                     <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p>
//                                 )}
//                                 <a className={`signup mb-4`} onClick={handleRegister}>Save</a>
//                                 {/* <div className="border"></div> */}
//                                 {/* <div className="login-btn" onClick={handleRegister}>Next</div> */}

//                                 {/* <a className="forgot-password" onClick={handleSkip} >{`Skip and Continue later `}<img src={Arrow} alt=""
// style={{ width: '10px' }} />
// </a> */}
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//             </div>
//         </>
//     ) : (

//         <div className="d-flex justify-content-center">
//             <div>
//                 <p className="welcome-title">Welcome!!</p>
//                 <div className="explore-btn" onClick={handleExplore}>Explore Platform</div>
//             </div>
//         </div>


//     )
// }