
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form } from 'react-bootstrap';


const initialState = {
    name: '',
    lastlogin: '',
    email: '',
    phone: '',
    status: ''
}

const ViewUser = ({ show, detailData, handleClose }) => {
    const token = localStorage.getItem("adminToken");

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (detailData) {
            setFormData({
                name: detailData?.name,
                lastlogin: detailData?.lastlogin,
                status: detailData?.status,
                email: detailData?.email,
                phone: detailData?.phone
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
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default ViewUser;

