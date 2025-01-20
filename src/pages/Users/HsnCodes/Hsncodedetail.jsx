import { useLocation } from "react-router-dom";
import { UserTopBar } from "../../../component/Topbar/Topbar";
import { useEffect, useState } from "react";
import { Axios } from "../../../config/config";
import toast from "react-hot-toast";

const Hsncodedetail = () => {
    const { state } = useLocation();
    const [hsnData, setHsnData] = useState([]);
    const [loading, setLoading] = useState(true);

    const userRegisterToken = localStorage.getItem('user-register-token');
    const userLoginToken = localStorage.getItem('user-login-token');


    return (
        <>
            <div>
                <UserTopBar />
                <div className='user-profile'>
                    {/* <div>
                        <p className=" mt-4 mb-4">Back</p>
                    </div> */}
                    <h3 className="users-title mt-0 mb-4">HSN Codes Details</h3>

                    <div className="profile-bottom mt-0">
                        <div className="row">
                            <h5 className="users-title profile-title mt-2 mb-4 mb-md-5">HSN Codes Details</h5>

                            <div className="col-lg-6 ">
                                <form>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">HSN Codes:</label>
                                        <input
                                            type="text"
                                            value={state?.hsn_code}
                                            className=' mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Chapter:</label>
                                        <input
                                            type="text"
                                            value={state?.chapter}
                                            className='mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Basic Duty Sch:</label>
                                        <input
                                            type="text"
                                            placeholder="Rudra PVT. LTD."
                                            value={state?.basic_duty_sch}
                                            className='mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Description:</label>
                                        <input
                                            type="text"
                                            value={state?.description}
                                            className='mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Remark:</label>
                                        <input
                                            type="text"
                                            value={state?.remark || ""}
                                            className='mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">SWS:</label>
                                        <input
                                            type="text"
                                            value={state?.sws}
                                            className=' mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6">

                                <form>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Non Tariff Barriers:</label>
                                        <input
                                            type="text"
                                            value={state?.non_tariff_barriers}
                                            className=' mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">GST:</label>
                                        <input
                                            type="text"
                                            value={state?.igst}
                                            className=' mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Import Policy:</label>
                                        <input
                                            type="text"
                                            value={state?.import_policy}
                                            className='mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Pref Duty:</label>
                                        <input
                                            type="text"
                                            value={state?.pref_duty || ""}
                                            className=' mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <label for="username">Unit:</label>
                                        <input
                                            type="text"
                                            value={state?.unit}
                                            className=' mb-3 mb-md-0'
                                            readOnly
                                        />
                                    </div>
                                </form>
                            </div>

                        </div>
                        {state?.notes?.map((item, index) => {
                            console.log("index", index);
                            return (
                                <div className="row">
                                    <div className="form-group d-flex align-items-center">
                                        <p for="username" className="notes-title">Notes {index + 1}:</p>
                                    </div>
                                    <div className="col-lg-6">
                                        <form>
                                            <div className="form-group d-flex align-items-center">
                                                <label for="username">HSN Codes:</label>
                                                <input
                                                    type="text"
                                                    value={item?.hsn_code}
                                                    className=' mb-3 mb-md-0'
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group d-flex align-items-center">
                                                <label for="username">Chapter:</label>
                                                <input
                                                    type="text"
                                                    value={item?.chapter}
                                                    className=' mb-3 mb-md-0'
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group d-flex align-items-center">
                                                <label for="username">Description:</label>
                                                <input
                                                    type="text"
                                                    value={item?.description}
                                                    className='mb-3 mb-md-0'
                                                    readOnly
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-6">

                                        <form>
                                            <div className="form-group d-flex align-items-center">
                                                <label for="username">Remark:</label>
                                                <input
                                                    type="text"
                                                    value={item?.remark}
                                                    className=' mb-3 mb-md-0'
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group d-flex align-items-center">
                                                <label for="username">Import Policy:</label>
                                                <input
                                                    type="text"
                                                    value={item?.import_policy}
                                                    className=' mb-3 mb-md-0'
                                                    readOnly
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div >
        </>
    )
}
export default Hsncodedetail; 