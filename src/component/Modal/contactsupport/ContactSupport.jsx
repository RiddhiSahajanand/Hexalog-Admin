import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import close from "../../../assets/close-icon.png";

const ContactSupport = ({ show, handleClose, handleSubmit }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: ""
    })
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name", name, value.length);
        // if (name === username || value.length > 30) {
        //     setErrorMessage("Username must be 40 characters")
        //     return;
        // }
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[a-z]+\.[a-z]{2,}$/;

        if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
            return "All field required.";
        }
        if (!emailRegex.test(formData.email)) {
            return "Please enter a valid email.";
        }
        if (formData.mobile.length < 10) {
            return "Please enter a valid mobile number.";
        }
        if (formData.mobile.length > 16) {
            return "Please enter a valid mobile number.";
        }
        if (formData.message.length > 40) {
            return "message must be 40 characters or less.";
        }
        return "";
    };

    const handleSubmitForm = () => {
        const validationError = validateInputs();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }
        console.log("formData", formData);
        handleSubmit();
        setFormData({
            name: "",
            email: "",
            mobile: "",
            message: ""
        })
        setErrorMessage("")
    }
    const handleCloseModal = () => {
        setFormData({
            name: "",
            email: "",
            mobile: "",
            message: ""
        });
        handleClose();
        setErrorMessage("")


    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="custom-modal">
            <div className="modal-view-section">
                <span
                    className="position-absolute"
                    style={{
                        top: '20px',
                        right: '30px',
                        cursor: 'pointer',
                        fontSize: '2px',
                        zIndex: 10,
                    }}
                    onClick={handleCloseModal}>
                    <img src={close} style={{ height: 24, width: 24 }} />
                </span>
                <div
                    className="">
                    <p className="contact-title">Contact Support</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-control custom-input ${errorMessage && !formData.name ? 'input-error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-control custom-input ${errorMessage && !formData.email ? 'input-error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                placeholder="Enter mobile"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className={`form-control custom-input ${errorMessage && !formData.mobile ? 'input-error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                type="text"
                                placeholder="Enter message"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-control custom-input ${errorMessage && !formData.message ? 'input-error' : ''}`}
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-center" style={{ color: '#F62D2D' }}>{errorMessage}</p>
                        )}
                        <div className="contact-btn" onClick={handleSubmitForm}>Submit</div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ContactSupport