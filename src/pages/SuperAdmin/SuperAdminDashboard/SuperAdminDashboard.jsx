
import { useNavigate } from "react-router-dom";
import Dashboard1 from "../../../assets/dashboard-1.png";
import Dashboard2 from "../../../assets/dashboard-2.png";
import Dashboard3 from "../../../assets/dashboard-3.png";
import bgRectangle from "../../../assets/Rectangle 12.png";
import rectangle from "../../../assets/rectangle.png";
import dashboard1img from "../../../assets/dahboard1.png";
import dashboard2img from "../../../assets/dashboard2.png";
import dashboard3img from "../../../assets/dashboard3.png";

// rectangle
// dashboard1 

import { useEffect, useState } from "react";

const SuperAdminDashboard = () => {
    const navigate = useNavigate();

    const handleCardOne = () => {
        navigate("/super-admin/users")
    }
    const handleCardTwo = () => {
        // navigate("/super-admin/users")
    }
    const handleCardThree = () => {
        navigate("/super-admin/users", { state: { selectedOption: "1" } });
    }

    return (
        <div>
            <div className="d-flex dashbord-bg-plan">
                <div className="container ms-0" >
                    <div className="row" style={{ gap: '30px' }}>
                        {/* Card 1 */}
                        {/* <div className="col-12 col-md-4 col-lg-3 mb-4">
                            <div className="card shadow-sm p-3 bg-white rounded text-center custom-card">
                                <div className="striped-bg " style={{ backgroundImage: `url(${bgRectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={Dashboard1}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mt-4">Total Users</h5>
                                </div>
                            </div>
                        </div> */}
                        {/* <div style={{ maxWidth: '300px', cursor: 'pointer' }} onClick={handleCardOne}>
                            <div className="card shadow-sm p-3 bg-white rounded text-center custom-card">

                                <div className="striped-bg " style={{ backgroundImage: `url(${bgRectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={Dashboard1}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mt-4">Total Users</h5>
                                </div>
                            </div>
                        </div> */}

                        <div style={{ maxWidth: '281px', cursor: 'pointer' }} onClick={handleCardOne}>
                            <div className="card shadow-sm  bg-white  text-center custom-card">

                                <div className="striped-bg " style={{ backgroundImage: `url(${rectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={dashboard1img}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="">
                                    <h5 className="card-title mt-4">Total Users</h5>
                                    <h5 className="card-title mb-4">500</h5>
                                </div>
                            </div>
                        </div>

                        <div style={{ maxWidth: '281px', cursor: 'pointer' }} onClick={handleCardOne}>
                            <div className="card shadow-sm  bg-white  text-center custom-card">

                                <div className="striped-bg " style={{ backgroundImage: `url(${rectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={dashboard2img}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="">
                                    <h5 className="card-title mt-4">Sub Admin Users</h5>
                                    <h5 className="card-title mb-4">500</h5>
                                </div>
                            </div>
                        </div>

                        <div style={{ maxWidth: '281px', cursor: 'pointer' }} onClick={handleCardOne}>
                            <div className="card shadow-sm  bg-white  text-center custom-card">

                                <div className="striped-bg " style={{ backgroundImage: `url(${rectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={dashboard3img}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="">
                                    <h5 className="card-title mt-4">Active Users</h5>
                                    <h5 className="card-title mb-4">500</h5>
                                </div>
                            </div>
                        </div>



                        {/* Card 2 */}
                        {/* <div style={{ maxWidth: '300px', cursor: 'pointer' }} onClick={handleCardTwo}> 
                            <div className="card shadow-sm p-3 bg-white rounded text-center custom-card">

                                <div className="striped-bg " style={{ backgroundImage: `url(${bgRectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={Dashboard2}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mt-4">Sub Admin Users</h5>
                                </div>
                            </div>
                        </div> */}

                        {/* Card 3 */}
                        {/* <div style={{ maxWidth: '300px', cursor: 'pointer' }} onClick={handleCardThree}>
                            <div className="card shadow-sm p-3 bg-white rounded text-center custom-card">

                                <div className="striped-bg " style={{ backgroundImage: `url(${bgRectangle})`, position: 'relative' }}></div>

                                <div className="image-container">
                                    <img
                                        src={Dashboard3}
                                        alt="Total Users"
                                        className="rounded-circle profile-img"
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mt-4">Active Users</h5>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;


