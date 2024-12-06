import React, { useEffect, useState } from 'react';
import { UserTopBar } from '../../../component/Topbar/Topbar';
import { useLocation } from 'react-router-dom';
import { Axios } from '../../../config/config';
import Avatar from 'react-avatar';

const initialState = {
    name: '',
    lastlogin: '',
    email: '',
    phone: '',
    status: '',
    verificationStatus: '',
    individualUser: '',
    gst_number: '',
    pan_number: '',
    account_number: '',
    ifsc_code: '',
}
const UserProfile = () => {
    const [formData, setFormData] = useState(initialState);
    const [detailData, setDetailData] = useState({});

    console.log('====================================');
    console.log("detailData", detailData);
    console.log('====================================');

    const location = useLocation();
    const user = location.state?.user;

    const token = localStorage.getItem("superadmin-login-token");

    const getUser = async () => {
        try {
            const { data } = await Axios.get(`/users/profile/${user}`, {
                headers: { "access-token": token },
            });
            if (data?.status) {
                // toast.success(data?.message);
                setDetailData(data?.user_profile)
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getUser();
    }, [user])
    return (
        <div>
            <div className='superadmin-user-profile'>

                <h3 className="users-title mt-4 mb-4">User Profile</h3>


                <div className="profile-top">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-3 col-12">
                            <div className="left">
                                <div className="d-flex align-items-center">
                                    {/* <img src="/user.png" alt="" className='img-fluid' /> */}
                                    <Avatar
                                        name={detailData ? detailData?.name?.charAt(0).toUpperCase() : ""}
                                        size="80" round={true}
                                        fgColor="#FFF"
                                        className="custom-avatar"
                                    />

                                    <div className='left-space'>
                                        <h4>{detailData?.name}</h4>
                                        <p>{detailData?.email}</p>
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
                                        <p className='mb-0'>+91 {detailData.phone}</p>
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
                                        placeholder=""
                                        value=""
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Organization Type:</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value=""
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Organization Name:</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value=""
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Rudra Patel"
                                        value={detailData?.name}
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Email ID:</label>
                                    <input
                                        type="text"
                                        placeholder="rudrapatel@gmail.com"
                                        value={detailData?.email}
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Mobile Number:</label>
                                    <input
                                        type="text"
                                        placeholder="+91 1 2345 67890"
                                        value={detailData?.phone}
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
                                        value={detailData?.customerProfile?.gst_number}
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">PAN Number:</label>
                                    <input
                                        type="text"
                                        placeholder="BAJPC4350M"
                                        value={detailData?.customerProfile?.pan_number}
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">Account Number:</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={detailData?.customerProfile?.account_number}
                                        className=' mb-3 mb-md-0'
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">IFSC Code:</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={detailData?.customerProfile?.ifsc_code}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <label for="username">KYC Status:</label>
                                    <input
                                        type="text"
                                        placeholder="Completed"
                                        value={detailData?.verificationStatus}
                                        // className='pending'
                                        className={`${detailData?.verificationStatus === "PENDING" ? 'pending' : 'status'}`}
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

export default UserProfile;