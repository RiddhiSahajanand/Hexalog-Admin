
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form } from 'react-bootstrap';


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

const ViewUser = ({ show, detailData, handleClose }) => {


    const token = localStorage.getItem("adminToken");

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (detailData) {

            // const lastLogin = new Date(detailData?.lastLoginAt);
            // const formattedDate = lastLogin.toISOString().split('T')[0];
            // const time = lastLogin.toTimeString().split(' ')[0];

            // const lastlogin= `${formattedDate} ${time}`;


            let lastlogin = "N/A"; // Default value if lastLoginAt is invalid

            if (detailData?.lastLoginAt) {
                const lastLogin = new Date(detailData.lastLoginAt);
                if (!isNaN(lastLogin)) {
                    const formattedDate = lastLogin.toISOString().split('T')[0];
                    const time = lastLogin.toTimeString().split(' ')[0];
                    lastlogin = `${formattedDate} ${time}`;
                }
            }

            setFormData({
                name: detailData?.name,
                lastlogin: lastlogin,
                status: detailData?.status,
                email: detailData?.email,
                phone: detailData?.phone,
                verificationStatus: detailData?.verificationStatus,
                individualUser: detailData?.individualUser,
                gst_number: detailData?.customerProfile?.gst_number,
                pan_number: detailData?.customerProfile?.pan_number,
                account_number: detailData?.customerProfile?.account_number,
                ifsc_code: detailData?.customerProfile?.ifsc_code,
            });
        }
    }, [detailData]);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end" className="add-offcanvas">
                <div className="offcanvas-header">
                    <h4 id="offcanvasAddorderLabel">View User</h4>
                    <button type="button" className="btn-close text-reset" onClick={handleClose} />
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name :</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                placeholder="Enter Name"
                                value={formData.name}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email :</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Mobile Number :</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                id="phone"
                                placeholder="Enter Mobile Number"
                                value={formData.phone}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastlogin" className="form-label">Last Login :</label>
                            <input
                                type="text"
                                name="lastlogin"
                                className="form-control"
                                id="lastlogin"
                                placeholder="Enter Lastlogin"
                                value={formData.lastlogin}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="providerType" className="form-label">Status:</label>
                            <input
                                type="text"
                                name="status"
                                className="form-control"
                                id="status"
                                placeholder="Enter Lastlogin"
                                value={formData.status}
                                readOnly
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="verificationStatus" className="form-label">Verification Status:</label>
                            <input
                                type="text"
                                name="verificationStatus"
                                className="form-control"
                                id="verificationStatus"
                                placeholder="Enter Verification Status"
                                value={formData.verificationStatus}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="individualUser" className="form-label">Individual User:</label>
                            <input
                                type="text"
                                name="individualUser"
                                className="form-control"
                                id="individualUser"
                                placeholder="Enter individualUser"
                                value={formData.individualUser}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="gst_number" className="form-label">GST Number:</label>
                            <input
                                type="text"
                                name="gst_number"
                                className="form-control"
                                id="gst_number"
                                placeholder="Enter Gst Number"
                                value={formData.gst_number}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pan_number" className="form-label">PAN Number:</label>
                            <input
                                type="text"
                                name="pan_number"
                                className="form-control"
                                id="pan_number"
                                placeholder="Enter Pan Number"
                                value={formData.pan_number}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="account_number" className="form-label">Account Number:</label>
                            <input
                                type="text"
                                name="account_number"
                                className="form-control"
                                id="account_number"
                                placeholder="Enter Account Number"
                                value={formData.account_number}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="gst_number" className="form-label">IFSC Number:</label>
                            <input
                                type="text"
                                name="ifsc_code"
                                className="form-control"
                                id="ifsc_code"
                                placeholder="Enter Ifsc Code"
                                value={formData.ifsc_code}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default ViewUser;





