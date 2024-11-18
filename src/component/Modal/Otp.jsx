
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';

const Otp = () => {

    const [formData, setFormData] = useState({
        otp: "",
    });

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <div className="modal-header">
                    <h5 className="modal-title" id="deleteModalLabel">Delete Course</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this course?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="close-btn" onClick={handleClose}>
                        Close
                    </button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </Modal>


        </>
    );
};

export default Otp;
