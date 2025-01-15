import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import close from "../../../assets/close-icon.png";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../../config/config';
import toast from 'react-hot-toast';
import { Button, Form } from 'react-bootstrap';

const EditCategories = ({ show, handleClose, handleSubmit, fetchData, editData }) => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem("superadmin-login-token");


    useEffect(() => {
        setFormData({
            id: editData?.id,
            name: editData?.name,
            description: editData?.description
        })
    }, [editData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
    };
    const addCategories = async () => {

        if (!formData.name) {
            setErrorMessage('Please enter name ');
            return;
        }
        if (!formData.description) {
            setErrorMessage('Please enter description ');
            return;
        }
        setErrorMessage('');
        try {

            const res = await Axios.patch(`/categories/${formData?.id}`, formData, {
                headers: {
                    "access-token": `${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res?.data?.status === "success") {
                toast.success(res.data.message);
                handleSubmit();
                handleClose();
                fetchData(1)
            }
            else {
                console.log("Error");
            }
        } catch (err) {
            console.error("CreateKYC-Api++", err);

            if (err.response.data.success === false) {
                toast.error(err.response.data.message);
            }
        }

    }
    return (
        <Modal show={show} onHide={handleClose} centered >
            <div className='categories-modal-header'>
                <Modal.Title className="fw-bold categories-contact-title ">Edit Document Category</Modal.Title>
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
                            onChange={handleChange}
                            className={`form - control custom - input ${errorMessage && !formData.name ? 'input-error' : ''
                                }`} />
                    </div>
                    <div className="form-group flex-column  position-relative">
                        <p htmlFor="name" className='category-label'>Description</p>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`form-control custom-input ${errorMessage && !formData.description ? 'input-error' : ''
                                } `} />
                    </div>
                    {errorMessage && (
                        <p className="text-center" style={{ color: '#F62D2D' }}>
                            {errorMessage}
                        </p>
                    )}
                </Form>
            </div>
            <div className='categories-modal-footer'>
                <Button
                    variant="outline-secondary"
                    onClick={handleClose}
                    className="px-3"
                >
                    Cancel
                </Button>
                <Button variant="primary" className="px-3" onClick={addCategories}
                >
                    Submit
                </Button>
            </div>
        </Modal >

    )
}

export default EditCategories