

import logo from "../../../assets/hexalog-logo.png";
import { useNavigate } from "react-router-dom";


const Welcomepage = () => {

    const naviagte = useNavigate();
    const handleExplore = () => {
        naviagte("/dashboard")
    }
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
                <div className="welcome-bg-three d-flex ">

                </div>
            </div >
        </>
    )
}
export default Welcomepage;


