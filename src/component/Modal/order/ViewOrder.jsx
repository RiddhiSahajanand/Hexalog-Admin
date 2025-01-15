
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import close from "../../../assets/close-icon.png";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../../config/config';
import toast from 'react-hot-toast';
import { Button, Form } from 'react-bootstrap';

const ViewOrder = ({ show, handleClose, detailData }) => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem("superadmin-login-token");

    useEffect(() => {
        setFormData({
            id: detailData?.id,
            name: detailData?.name,
            description: detailData?.description
        })
    }, [detailData])


    return (
        <Modal show={show} onHide={handleClose} centered >
            <div className='categories-modal-header'>
                <Modal.Title className="fw-bold categories-contact-title ">View Order</Modal.Title>
            </div>
            <div className='categories-modal-body'>
                <Form>
                    <div className="form-group flex-column mb-3 position-relative">
                        <p htmlFor="name" className='category-label'>Name</p>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            maxLength={15}
                            readOnly
                            className={`form-control custom-input ${errorMessage && !formData.name ? 'input-error' : ''}`} />
                    </div>
                    <div className="form-group flex-column mb-3 position-relative">
                        <p htmlFor="name" className='category-label'>Description</p>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            readOnly
                            className={`form-control custom-input ${errorMessage && !formData.description ? 'input-error' : ''} `} />
                    </div>
                    {errorMessage && (
                        <p className="text-center" style={{ color: '#F62D2D' }}>
                            {errorMessage}
                        </p>
                    )}
                </Form>
            </div>
            <div className='categories-modal-footer'>
                {/* <Button
                    variant="outline-secondary"
                    onClick={handleClose}
                    className="px-3">
                    Cancel
                </Button> */}
                <Button variant="primary" className="px-3" onClick={handleClose}
                >
                    Close
                </Button>
            </div>
        </Modal >

    )
}

export default ViewOrder