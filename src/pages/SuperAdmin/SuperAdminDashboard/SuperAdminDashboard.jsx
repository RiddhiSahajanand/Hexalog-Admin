
import { useNavigate } from "react-router-dom";
import Dashboard1 from "../../../assets/dashboard-1.png";
import Dashboard2 from "../../../assets/dashboard-2.png";
import Dashboard3 from "../../../assets/dashboard-3.png";
import bgRectangle from "../../../assets/Rectangle 12.png";

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
                    <div className="row">
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
                        <div style={{ maxWidth: '300px', cursor: 'pointer' }} onClick={handleCardOne}>
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
                        </div>

                        {/* Card 2 */}
                        <div style={{ maxWidth: '300px', cursor: 'pointer' }} onClick={handleCardTwo}>
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
                        </div>

                        {/* Card 3 */}
                        <div style={{ maxWidth: '300px', cursor: 'pointer' }} onClick={handleCardThree}>
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
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default SuperAdminDashboard;


