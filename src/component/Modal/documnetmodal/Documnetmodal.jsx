import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import close from "../../../assets/close-icon.png";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../../config/config';
import toast from 'react-hot-toast';

const Documentmodal = ({ show, handleClose, OrderId, order, fetchDocument }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: '',
        document: '',
    });
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("superadmin-login-token");
    console.log("formData", formData);

    const [errorMessage, setErrorMessage] = useState('');

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const response = await Axios.get("/categories", {
                headers: {
                    "access-token": `${token}`,
                },
            });
            setCategories(response?.data?.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories.");
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value, // Handle file input
        });
        setErrorMessage("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category || !formData.document) {
            setErrorMessage(" category and document are required.");
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("categoryId", formData.category);
        formData.document.forEach((file) => {
            formDataObj.append("documentFiles", file); // Use the correct field name based on your API
        });
        formDataObj.append("orderId", OrderId);
        formDataObj.append("description", order?.state?.description)

        try {
            const response = await Axios.post("/documents", formDataObj, {
                headers: {
                    "access-token": `${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response?.data?.status === "success") {
                toast.success("Document uploaded successfully!");
                fetchDocument();
                handleClose();
                setFormData({
                    category: '',
                    document: ''
                })
            } else {
                toast.error(response?.data?.error)
            }

        } catch (error) {
            console.error("Error submitting document:", error);
            toast.error("Failed to upload document.");
        }
    };

    const handleCloseModal = () => {
        handleClose();
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


                <div>
                    <p className="register-main-title fw-bold">Add Document</p>
                    <form>
                        <div className="space-y-4">
                            <div className="form-group flex-column mb-3 position-relative">
                                <span htmlFor="category" style={{ fontSize: '14px', color: '#442A59' }}>Select Category :</span>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`form-control custom-input mt-1 ${errorMessage && !formData.category ? 'input-error' : ''}`}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group flex-column mb-3 position-relative">
                                <span htmlFor="document" style={{ fontSize: '14px', color: '#442A59' }}>Chooes Document :</span>
                                <input
                                    type="file"
                                    name="document"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files); // Convert FileList to an array
                                        setFormData({ ...formData, document: files }); // Update the state with the files
                                        setErrorMessage("");
                                    }}
                                    className={`form-control custom-input mt-1 ${errorMessage && !formData.gst_number ? 'input-error' : ''}`}
                                />
                            </div>

                            {errorMessage && (
                                <p className="text-center" style={{ color: '#F62D2D' }}>
                                    {errorMessage}
                                </p>
                            )}
                            <a className={`signup mb-4`} onClick={handleSubmit}>
                                Submit
                            </a>
                        </div>
                    </form>
                </div>
            </div >
        </Modal >
    )
}

export default Documentmodal