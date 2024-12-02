import React from 'react';
import { UserTopBar } from '../../../component/Topbar/Topbar';

const Profile = () => {
    return (
        <div>
            <UserTopBar />

            <div className='user-profile'>

                <h3 className="users-title mt-4 mb-4">My Profile</h3>


                <div className="profile-top">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-3 col-12">
                            <div className="left">
                                <div className="d-flex align-items-center">
                                    <img src="/user.png" alt="" className='img-fluid' />

                                    <div className='left-space'>
                                        <h4>Rudra Patel</h4>
                                        <p>rudrapatel@gmail.com</p>
                                    </div>
                                </div>
                                <div className='image'></div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12">
                            <div className="right">
                                <div className="d-flex align-items-center">
                                    <img src="/call.png" alt="" className='img-fluid' />

                                    <div className='left-space'>
                                        <p className='mb-0'>Mobile Number:</p>
                                        <p className='mb-0'>+91 12345 67890</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-bottom mt-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className="users-title profile-title mt-2 mb-4 mb-md-5">Personal Details</h5>

                            <form>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Your Type:</label>
                                    <input
                                        type="text"
                                        placeholder="Organization"
                                        value="Organization"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Organization Type:</label>
                                    <input
                                        type="text"
                                        placeholder="Enterprises"
                                        value="Enterprises"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Organization Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Rudra PVT. LTD."
                                        value="Rudra PVT. LTD."
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Rudra Patel"
                                        value="Rudra Patel"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Email ID:</label>
                                    <input
                                        type="text"
                                        placeholder="rudrapatel@gmail.com"
                                        value="rudrapatel@gmail.com"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Mobile Number:</label>
                                    <input
                                        type="text"
                                        placeholder="+91 1 2345 67890"
                                        value="+91 1 2345 67890"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <h5 className="users-title profile-title mt-2 mb-4 mb-md-5">KYC & A/C Details</h5>

                            <form>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">GST Number:</label>
                                    <input
                                        type="text"
                                        placeholder="24HCWTT5199S4Z4"
                                        value="24HCWTT5199S4Z4"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">PAN Number:</label>
                                    <input
                                        type="text"
                                        placeholder="BAJPC4350M"
                                        value="BAJPC4350M"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Account Number:</label>
                                    <input
                                        type="text"
                                        placeholder="466715372582"
                                        value="Account Number"
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">IFSC Code:</label>
                                    <input
                                        type="text"
                                        placeholder="UTBI0DMCC46"
                                        value="UTBI0DMCC46"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">KYC Status:</label>
                                    <input
                                        type="text"
                                        placeholder="Completed"
                                        value="Completed"
                                        className='status' col-md-3
                                        readOnly
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile;