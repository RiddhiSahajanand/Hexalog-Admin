
import React, { useEffect, useState } from 'react';
import { UserTopBar } from '../../../component/Topbar/Topbar';
import Kycmodal from '../../../component/Modal/Kycmodal/Kycmodal';


const Dashboard = () => {
    const [verificationStatusValue, setVerificationStatusValue] = useState('');
    const [isShow, setIsShow] = useState(false);

    const verificationStatus = localStorage.getItem('verificationStatus');

    useEffect(() => {
        setVerificationStatusValue(verificationStatus);
    }, [])

    useEffect(() => {
        { verificationStatusValue === "PENDING" ? setIsShow(true) : setIsShow(false) }
    }, [verificationStatusValue]) 

    const handleClose = () => {
        setVerificationStatusValue("");
        setIsShow(false);
    }
    const handleSubmit = () => {

    }

    return (
        <div>
            <div className='d-flex user-dashbord-bg-plan'>
                <Kycmodal show={isShow} handleClose={handleClose} handleSubmit={handleSubmit} />
            </div>
        </div >
    );
};

export default Dashboard;

