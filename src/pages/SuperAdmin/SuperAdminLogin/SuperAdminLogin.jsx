
// import { useState } from "react";
// import logo from "../../../assets/hexalog-logo.png";
// import LogisticIcon from "../../../assets/Logistic.png";
// import financeIcon from "../../../assets/Receive Dollar.png";
// import TradeIcon from "../../../assets/Hierarchy.png";
// import GlobleIcon from "../../../assets/Globe Network.png";
// import Arrow from "../../../assets/arrow.png";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FontAwesome icons


// const SuperAdminLogin = () => {

//     const naviagte = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [username, setUsername] = useState(''); // State for username
//     const [password, setPassword] = useState(''); // State for password
//     const [errorMessage, setErrorMessage] = useState(''); // State for error message

//     // Function to toggle password visibility
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const staticUsername = "hexalogadmin@gmail.com";
//     const staticPassword = "123456";

//     // Function to handle login
//     const handleLogin = () => {
//         if (!username) {
//             setErrorMessage('Enter valid username or password'); // Display error if username is empty
//             return;
//         }
//         if (!password) {
//             setErrorMessage('Enter valid username or password'); // Display error if password is empty
//             return;
//         }

//         // Check if entered username and password match the static credentials
//         if (username === staticUsername && password === staticPassword) {
//             navigate("/super-admin/dashboard"); // Navigate to another screen if credentials match
//         } else {
//             setErrorMessage('Enter valid email or password'); // Display error if credentials don't match
//         }
//     };
//     const handleForgottpssword = () => {
//         navigate("/ForgottPassword")
//     }

//     return (
//         <>
//             <div className="login-container">
//                 <div className="bg-two d-flex align-items-center">
//                     <div className="container my-5 my-lg-0">
//                         <img src={logo} alt="" />
//                         <div className="row g-lg-5 ps-0 ps-lg-5">
//                             <div className="col-12 col-lg-6 pt-5 ps-5">
//                                 <div className="left-section">
//                                     <div className="tagline">AMPLIFYING BUSINESS</div>
//                                     <div className="tagline bg-color-2nd">BEYOND BOUNDARIES</div>
//                                     <div className="features my-5">
//                                         <div className="feature">
//                                             <div className="feature-icon">
//                                                 <img src={LogisticIcon} alt="" className="icon-box" />
//                                             </div>
//                                             <div className="fw-medium feture-text">End to End <br />Logistics</div>
//                                         </div>
//                                         <div className="feature">
//                                             <div className="feature-icon">
//                                                 <img src={financeIcon} alt="" className="icon-box" />
//                                             </div>
//                                             <div className="fw-medium feture-text">Finance & <br />Compliance</div>
//                                         </div>
//                                         <div className="feature">
//                                             <div className="feature-icon">
//                                                 <img src={TradeIcon} alt="" className="icon-box" />
//                                             </div>
//                                             <div className="fw-medium feture-text">Trade <br /> Management</div>
//                                         </div>
//                                         <div className="feature">
//                                             <div className="feature-icon">
//                                                 <img src={GlobleIcon} alt="" className="icon-box" />
//                                             </div>
//                                             <div className="fw-medium feture-text">Global <br /> Network</div>
//                                         </div>
//                                     </div>
//                                     <div className="schedule-demo">Schedule Demo <img src={Arrow} alt=""
//                                         style={{ width: '10px' }} /></div>
//                                 </div>
//                             </div>
//                             <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center px-5" style={{ width: '500px', height: '650px' }} >
//                                 <div className="right-section" style={{ width: '500px', height: '500px' }} >
//                                     <h2 className="fw-bold">Welcome!</h2>
//                                     <form>
//                                         <div className="form-group">
//                                             <label for="email">Email</label>
//                                             <input
//                                                 type="email"
//                                                 placeholder="Enter Email"
//                                                 value={username}
//                                                 onChange={(e) => setUsername(e.target.value)}
//                                                 required
//                                                 className={`form-control custom-input ${errorMessage && !username ? 'input-error' : ''}`}
//                                             />
//                                         </div>
//                                         <div className="d-flex form-group flex-column mb-3 position-relative">
//                                             <label htmlFor="password" className="mb-1 label">Password</label>
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 placeholder="Enter Password"
//                                                 id="password"
//                                                 value={password} // Bind password state
//                                                 onChange={(e) => setPassword(e.target.value)} // Update password state
//                                                 className={`form-control custom-input ${errorMessage && !password ? 'input-error' : ''}`}

//                                             />
//                                             <span
//                                                 onClick={togglePasswordVisibility}
//                                                 className="position-absolute"
//                                                 style={{ top: '35px', right: '10px', cursor: 'pointer' }}
//                                             >
//                                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                             </span>
//                                         </div>
//                                         {errorMessage && (
//                                             <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p> // Display error message
//                                         )}
//                                         <div className="login-btn mb-5" onClick={handleLogin}>Login</div>

//                                         {/* <a href="#" className="forgot-password" onClick={handleForgottpssword}>Forgot password?</a> */}

//                                         {/* <div className="border my-5"></div> */}

//                                         {/* <a href="#" className="signup">Signup</a> */}
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div >
//             </div >
//         </>
//     )
// }
// export default SuperAdminLogin;



import { useEffect, useState } from "react";
import logo from "../../../assets/hexalog-logo.png";
import LogisticIcon from "../../../assets/Logistic.png";
import financeIcon from "../../../assets/Receive Dollar.png";
import TradeIcon from "../../../assets/Hierarchy.png";
import GlobleIcon from "../../../assets/Globe Network.png";
import Arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Axios } from "../../../config/config";

import rightArrow from "../../../assets/right-Arrow.png";

import toast from "react-hot-toast";

const SuperAdminLogin = () => {

    const navigate = useNavigate();
    const superadmintoken = localStorage.getItem("superadmin-login-token");

    useEffect(() => {
        if (superadmintoken) {
            navigate(-1)
        }
    }, [superadmintoken]);



    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const staticUsername = "hexalog@admin.com";
    const staticPassword = "12345678";


    const handleLogin = async () => {
        if (!username) {
            setErrorMessage('Enter valid email or password');
            return;
        }
        if (!password) {
            setErrorMessage('Enter valid email or password');
            return;
        }
        // if (username === staticUsername && password === staticPassword) {
        const formData = {
            username: username,
            password: password,
            login_type: 1,
            user_type: 1
        };

        try {
            const res = await Axios.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                console.log("data", res.data.user.email);

                navigate("/super-admin/dashboard");
                localStorage.setItem("superadmin-login-token", res.data.token);
                localStorage.setItem("superadmin", res.data.user.email)
            } else {
                toast.error(res.data.error);
            }
        } catch (err) {
            console.error("Login-Api++", err);
            toast.error("Something went wrong, please try again later.");
        }
        // } else {
        //     setErrorMessage('Enter valid email or password');
        // }
    };

    return (
        <>
            {/* <div className="login-container">
                <div className="bg-two d-flex align-items-center">
                    <div className="container my-5 my-lg-0">
                        <img src={logo} alt="" />
                        <div className="row ">
                            <div className="col-6  pt-5 ps-5">
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
                            <div className="col-6  d-flex justify-content-center align-items-center px-5" style={{ width: '500px', height: '650px' }} >
                                <div className="right-section" style={{ width: '500px', height: '500px' }} >
                                    <h2 className="fw-bold">Welcome!</h2>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter email"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                className={`form-control custom-input ${errorMessage && !username ? 'input-error' : ''}`}
                                            />
                                        </div>
                                        <div className="d-flex form-group flex-column mb-3 position-relative">
                                            <label htmlFor="password" className="mb-1 label">Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                                id="password"
                                                value={password} // Bind password state
                                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                                className={`form-control custom-input ${errorMessage && !password ? 'input-error' : ''}`}
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className="position-absolute"
                                                style={{ top: '35px', right: '10px', cursor: 'pointer' }}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        {errorMessage && (
                                            <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p> // Display error message
                                        )}
                                        <div className="login-btn mb-5" onClick={handleLogin}>Login</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="login-container">
                <div className="bg-two d-flex align-items-center">
                    <div className="container my-5 my-lg-0">
                        <img src={logo} alt="" />
                        <div class="row">
                            <div className="col pt-5 ps-5">
                                <div className="left-section ps-5">
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
                                    {/* <div className="schedule-demo">Schedule Demo <img src={Arrow} alt="" style={{ width: '10px' }} /></div> */}

                                    {/* <div className="explore-btn">Schedule Demo <img src={rightArrow} alt="" style={{ height: '12px', width: '10px', marginTop: '6px', marginLeft: '8px' }} /> </div> */}

                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <div className=" d-flex justify-content-center align-items-center px-5" style={{ width: '550px', height: '650px' }} >
                                    <div className="super-right-section" style={{ width: '500px', height: '500px' }} >
                                        <h2 className="fw-bold">Welcome!</h2>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value)
                                                        setErrorMessage("");
                                                    }}
                                                    required
                                                    className={`form-control custom-input ${errorMessage && !username ? 'input-error' : ''}`}
                                                />
                                            </div>
                                            <div className="d-flex form-group flex-column mb-3 position-relative">
                                                <label htmlFor="password" className="mb-1 label">Password</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value)
                                                        setErrorMessage("");
                                                    }}
                                                    className={`form-control custom-input ${errorMessage && !password ? 'input-error' : ''}`}
                                                />
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="position-absolute"
                                                    style={{ top: '35px', right: '10px', cursor: 'pointer' }}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {errorMessage && (
                                                <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p>
                                            )}
                                            <div className="login-btn mb-5" onClick={handleLogin}>Login</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperAdminLogin;
