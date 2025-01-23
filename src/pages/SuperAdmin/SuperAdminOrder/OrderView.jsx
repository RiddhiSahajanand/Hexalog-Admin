import { TopBar } from "../../../component/Topbar/Topbar";
import arrowdownicon from "../../../assets/arrow-down.png";
import arrowupicon from "../../../assets/arrow-up.png";

import { Form } from "react-bootstrap";
import card1 from "../../../assets/card-1.png";
import card2 from "../../../assets/card-2.png";
import card3 from "../../../assets/card-3.png";
import dateIcon from "../../../assets/date-icon.png";
import product1 from "../../../assets/product1.png";
import product2 from "../../../assets/product2.png";
import product3 from "../../../assets/product3.png";
import invoice1 from "../../../assets/invoice-1.png";
import invoice2 from "../../../assets/invoice-2.png";
import invoice3 from "../../../assets/invoice-3.png";

import pdficon from "../../../assets/pdf.png";
import wordicon from "../../../assets/word.png";

import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../config/config";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../../component/Loader/Loader";
import Documentmodal from "../../../component/Modal/documnetmodal/documnetmodal";

const OrderView = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const token = localStorage.getItem("superadmin-login-token");
    const order = useLocation();

    const OrderId = order?.state?.id;
    const [openView, setOpenView] = useState(1);
    const [document, setDocument] = useState([]);
    const [uploadedDocument, setUploadedDocument] = useState([]);
    const [fieldData, setFieldData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    console.log("selectedIds", selectedIds);

    const toggleView = (view) => {
        setOpenView(view);
    };
    const handleClose = () => {
        setShow(false);
        setFieldData({})
    }

    const handleCheckboxChange = (itemId) => {
        setSelectedIds((prevSelected) => {
            if (prevSelected.includes(itemId)) {
                // If the ID is already selected, remove it
                return prevSelected.filter((id) => id !== itemId);
            } else {
                // Otherwise, add it
                return [...prevSelected, itemId];
            }
        });
    };

    const getOrderDetail = async (id) => {
        try {
            let url = `/orders/${id}`;

            const response = await Axios.get(url, {
                headers: {
                    "access-token": `${token}`,
                },
            });
            console.log('====================================');
            console.log("getOrderDetailresponse", response);
            console.log('====================================');

            // setCategoriesData(response.data?.categories || []);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/super-admin/login");
            }
            else {
                setError(error.message);
            }
            if (error.response.data.success === false) {
                toast.error(error.response.data.message);
                navigate("/super-admin/login");
            }
        }
    }

    const fetchDocument = async () => {
        try {
            let url = `/documents/orders/${OrderId}`;
            const response = await Axios.get(url, {
                headers: {
                    "access-token": `${token}`,
                },
            });
            console.log("response:----", response)
            setUploadedDocument(response?.data?.documents || [])
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/super-admin/login");
            }
            else {
                setError(error.message);
            }
            if (error.response.data.success === false) {
                toast.error(error.response.data.message);
                navigate("/super-admin/login");
            }
        }
    }

    useEffect(() => {
        fetchDocument();
        getOrderDetail(OrderId)
    }, [OrderId])

    const fetchExtractFieldsBatch = async () => {

        const documentIds = selectedIds.map((id) => id);
        console.log("documentIds", documentIds);
        setIsLoading(true);
        try {
            // Call POST API
            const response = await Axios.post("/documents/extract-fields-batch", { documentIds }, {
                headers: {
                    "access-token": `${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("response", response);
            if (response?.status === 200) {
                // setFieldData(response?.data?.extractedFields);
                toast.success("Fields extraction completed");
                setSelectedIds([]);
                setFieldData({});
            } else {
                toast.error(response?.data?.error)
            }
        } catch (error) {
            console.error("Error uploading documents:", error);
            setErrorMessage("Failed to upload documents. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }


    const fetchDocumentDetail = async () => {
        if (selectedIds.length === 0) {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        } else {
            fetchExtractFieldsBatch();
        }
    }

    const handleAddDocument = () => {
        // if (fileInputRef.current) {
        //     fileInputRef.current.click();
        // }
        setShow(true);
    };
    const extractFieldsApi = async (files) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("documentFile", file);
        });
        try {
            // Call POST API
            const response = await Axios.post("/documents/extract-fields", formData, {
                headers: {
                    "access-token": `${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response?.status === 200) {
                setFieldData(response?.data?.extractedFields);
            } else {
                toast.error(response?.data?.error)
            }
        } catch (error) {
            console.error("Error uploading documents:", error);
            setErrorMessage("Failed to upload documents. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleFetchFileChange = async (event) => {
        const files = Array.from(event.target.files);
        setDocument(files);
        extractFieldsApi(files);
        setIsLoading(true)
    };

    return (
        <>
            <div className="full-height">
                <div className="topbar-layout">
                    <TopBar />
                </div>
                {isLoading ? <Loader /> :
                    <div className="orderscreen-content">
                        <div className="row ">
                            <div className="col detail-section">
                                {/* Customer Detail */}
                                <div className="mb-3">
                                    <div className={`${openView === 1 ? 'active-header' : 'section-header'}`} onClick={() => toggleView(1)}>
                                        <span className="header-title">Customer Detail</span>
                                        <img
                                            src={openView === 1 ? arrowupicon : arrowdownicon}
                                            alt=""
                                            className="arrow-icon"
                                        />
                                    </div>
                                    {openView === 1 && (
                                        <div className="order-row customer-details">
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Customer Name :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.CustomerName === "Not Available" ? "" : fieldData?.CustomerName} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Email :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ContactInformation?.Email === "Not Available" ? "" : fieldData?.ContactInformation?.Email} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Address 1 :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value="" />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">State :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>Select State</option>
                                                            <option value="1">Maharashtra</option>
                                                            <option value="2">Gujarat</option>
                                                            <option value="3">Rajasthan</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Pin code :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value="" />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Effective date :</label>
                                                    <div className="input-view">02/06/2024</div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Order History :</label>
                                                    <div className="input-view">02/04/2024</div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Mobile no. :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ContactInformation?.Phone === "Not Available" ? "" : fieldData?.ContactInformation?.Phone} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Selected HAN :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value="" />
                                                    </div>
                                                </div>


                                                <div className="d-flex section-box">
                                                    <label className="label-box">Address 2 :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value="" />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">City :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>Select City</option>
                                                            <option value="1">Maharashtra</option>
                                                            <option value="2">Gujarat</option>
                                                            <option value="3">Rajasthan</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Eligibility Status :</label>
                                                    <div className="input-view">
                                                        <span className="status-text">Approved</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Expiry Date :</label>
                                                    <div className="input-view">02/06/2024</div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Payment Method :</label>
                                                    <div className="input-view" style={{ display: 'flex', gap: '8px' }}>
                                                        <img src={card1} alt="" className="card-img" />
                                                        <img src={card2} alt="" className="card-img" />
                                                        <img src={card3} alt="" className="card-img" />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <div className="check-button">
                                                        Check Eligibily
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Provider Details */}
                                <div className="mb-3">
                                    <div className={`${openView === 2 ? 'active-header' : 'section-header'}`} onClick={() => toggleView(2)}>
                                        <span className="header-title">Provider Details</span>
                                        <img
                                            src={openView === 2 ? arrowupicon : arrowdownicon}
                                            alt="" className="arrow-icon" />
                                    </div>
                                    {openView === 2 && (
                                        <div className="order-row customer-details">
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Provider Name :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ProviderName === "Not Available" ? "" : fieldData?.ProviderName} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Provider ID :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ProviderID === "Not Available" ? "" : fieldData?.ProviderID}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Date :</label>
                                                    <div className="input-view">
                                                        <div className="input-group">
                                                            <input
                                                                type="date"
                                                                className="form-control custom-date-input"
                                                                placeholder="Search by name or ID"
                                                                style={{ color: '#B4B4B4' }}
                                                                onFocus={(e) => e.target.classList.add('no-border')}
                                                                onBlur={(e) => e.target.classList.remove('no-border')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Provider Contact :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ProviderContact?.Phone === "Not Available" ? "" : fieldData?.ProviderContact?.Phone} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Service Type :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example" >
                                                            <option>{fieldData?.ServiceType}</option>
                                                            <option value="1">Air transport</option>
                                                            <option value="2">transport</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Time :</label>
                                                    <div className="input-view">
                                                        <input type="time" className="form-control custom-time-input" value="02:30" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Product details */}
                                <div className="mb-3">
                                    <div className={`${openView === 3 ? 'active-header' : 'section-header'}`} onClick={() => toggleView(3)} >
                                        <span className="header-title">Product Details</span>
                                        <img
                                            src={openView === 3 ? arrowupicon : arrowdownicon}
                                            alt="" className="arrow-icon" />
                                    </div>
                                    {openView === 3 && (
                                        <div className="product-details">
                                            <div className="">
                                                <table className="table text-center table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th className="text-start">Product Name</th>
                                                            <th>QTY</th>
                                                            <th>Rate</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1.</td>
                                                            <td className="text-start">
                                                                <div className="d-flex align-items-center">
                                                                    <img
                                                                        src={product1}
                                                                        alt="Product"
                                                                        width="60"
                                                                        height="50"
                                                                        className="me-3"
                                                                    />
                                                                    <div>
                                                                        <strong>Computerized Embroidery Machine</strong>
                                                                        <br />
                                                                        <span>Challenges and Innovations | Apparel Resources</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>2.00</td>
                                                            <td>Rs. 50,000</td>
                                                            <td>Rs. 1,00,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>2.</td>
                                                            <td className="text-start">
                                                                <div className="d-flex align-items-center">
                                                                    <img
                                                                        src={product2}
                                                                        alt="Product"
                                                                        width="60"
                                                                        height="50"
                                                                        className="me-3"
                                                                    />
                                                                    <div>
                                                                        <strong>Steel Angle Cutting Machine</strong>
                                                                        <br />
                                                                        <span>Challenges and Innovations | Apparel Resources</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>1.00</td>
                                                            <td>Rs. 10,50,000</td>
                                                            <td>Rs. 10,50,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>3.</td>
                                                            <td className="text-start">
                                                                <div className="d-flex align-items-center">
                                                                    <img
                                                                        src={product3}
                                                                        alt="Product"
                                                                        width="60"
                                                                        height="50"
                                                                        className="me-3"
                                                                    />
                                                                    <div>
                                                                        <strong>Computerized Embroidery Machine</strong>
                                                                        <br />
                                                                        <span>Challenges and Innovations | Apparel Resources</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>2.00</td>
                                                            <td>Rs. 50,000</td>
                                                            <td>Rs. 1,00,000</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="d-flex justify-content-end ">
                                                    <div className="total-view">
                                                        <div className="summary-container">
                                                            <div className="d-flex justify-content-between mb-3">
                                                                <span className="total-title">Sub total</span>
                                                                <strong className="rate-title">Rs. 1,250,000</strong>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <span className="total-title">Tax Rate</span>
                                                                <strong className="rate-title">5.00%</strong>
                                                            </div>

                                                        </div>
                                                        <div className="d-flex justify-content-between total mt-3">
                                                            <span>Total</span>
                                                            <span>Rs. 1,312,500</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Pricing Details */}
                                <div className="mb-3">
                                    <div className={`${openView === 4 ? 'active-header' : 'section-header'}`} onClick={() => toggleView(4)}>
                                        <span className="header-title">Pricing Details</span>
                                        <img src={openView === 4 ? arrowupicon : arrowdownicon}
                                            alt="" className="arrow-icon" />
                                    </div>
                                    {openView === 4 && (
                                        <div className="order-row customer-details">
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Unit Price :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.UnitPrice === "Not Available" ? "" : fieldData?.UnitPrice} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Shipping Fees :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ShippingFees === "Not Available" ? "" : fieldData?.ShippingFees} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Discounts :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.Discounts === "Not Available" ? "" : fieldData?.Discounts} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Total Price :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.TotalPrice === "Not Available" ? "" : fieldData?.TotalPrice} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Insurance Costs :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>{fieldData?.InsuranceCosts || "5000"}</option>
                                                            <option value="1">4500</option>
                                                            <option value="2">5000</option>
                                                            <option value="3">2000</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Tax Details */}
                                <div className="mb-3">
                                    <div className={`${openView === 5 ? 'active-header' : 'section-header'}`} onClick={() => toggleView(5)}>
                                        <span className="header-title">Tax Details</span>
                                        <img
                                            src={openView === 5 ? arrowupicon : arrowdownicon}
                                            alt="" className="arrow-icon" />
                                    </div>
                                    {openView === 5 && (
                                        <div className="order-row customer-details">
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">HSN Code :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.HSNCode === "Not Available" ? "" : fieldData?.HSNCode} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Applicable Tax Rate :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.ApplicableTaxRate === "Not Available" ? "" : fieldData?.ApplicableTaxRate} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Tax Jurisdiction :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.TaxJurisdiction === "Not Available" ? "" : fieldData?.TaxJurisdiction} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Taxes and Duties :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.TaxesandDuties === "Not Available" ? "" : fieldData?.TaxesandDuties} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Total Taxable Amount :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.TotalTaxableAmount === "Not Available" ? "" : fieldData?.TotalTaxableAmount} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Calculated Tax Amount :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.CalculatedTaxAmount === "Not Available" ? "" : fieldData?.CalculatedTaxAmount} />
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Tax Jurisdiction :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>{fieldData?.TaxJurisdiction || ""}</option>
                                                            <option value="1">4500</option>
                                                            <option value="2">5000</option>
                                                            <option value="3">2000</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="d-flex section-box">
                                                    <label className="label-box">Payment Terms :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>{fieldData?.PaymentTerms || "PIA"}</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Additional */}
                                <div>
                                    <div className={`${openView === 6 ? 'active-header' : 'section-header'}`} onClick={() => toggleView(6)} >
                                        <span className="header-title">Additional</span>
                                        <img
                                            src={openView === 6 ? arrowupicon : arrowdownicon}
                                            alt="" className="arrow-icon" />
                                    </div>
                                    {openView === 6 && (
                                        <div className="order-row customer-details">
                                            <div className="col">
                                                <div className="d-flex additional-section-box">
                                                    <label className="label-box">Order Status :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>{fieldData?.OrderStatus || "Pending"}</option>
                                                            <option value="1">Pending</option>
                                                            <option value="2">Complete</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="d-flex additional-section-box">
                                                    <label className="label-box">Documentation:</label>
                                                    <div className="input-view">
                                                        <img src={fieldData?.Documentation} alt="" />
                                                    </div>
                                                </div>
                                                <div className="d-flex additional-section-box">
                                                    <label className="label-box">Emergency Contacts :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.EmergencyContacts?.Phone || ""} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex additional-section-box">
                                                    <label className="label-box">Tracking Information :</label>
                                                    <div className="input-view">
                                                        <input type="text" className="form-control" value={fieldData?.TrackingInformation || ""} />
                                                    </div>
                                                </div>
                                                <div className="d-flex additional-section-box">
                                                    <label className="label-box">Regulatory Compliance :</label>
                                                    <div className="input-view">
                                                        <Form.Select aria-label="Default select example">
                                                            <option>{fieldData?.RegulatoryCompliance || ""}</option>
                                                            <option value="1">Accurately declaring goods </option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="d-flex  additional-section-box">
                                                    <label className="label-box">Sustainability Information :</label>
                                                    <div className="input-view">
                                                        <textarea type="text" className="form-control" value={fieldData?.SustainabilityInformation || ""} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col document-section">
                                <div className="col">
                                    <div className="mb-3">
                                        <div className="second-section-header">
                                            <span className="documnet-title">Documents</span>
                                            <div className="d-flex align-items-center">
                                                <span className="fetch-title " style={{ cursor: 'pointer' }} onClick={fetchDocumentDetail}>Fetch Details via OCR</span>
                                                <div className="d-flex justify-content-end">
                                                    <div className="add-documnet-button" onClick={handleAddDocument}>
                                                        <span>+ Add Documents</span>
                                                    </div>
                                                </div>
                                                {/* Hidden file input */}
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }} // Hides the input from the UI
                                                    onChange={handleFetchFileChange}
                                                    accept=".pdf" // Accepts only PDF files
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="invoice-header-view">
                                        <span>Invoice</span>
                                    </div>
                                    <div className="invoice-list mb-4">
                                        <div className="invoice">
                                            <img src={invoice1} alt="" />
                                            <span className="mt-3">Invoice 1</span>
                                        </div>
                                        <div className="invoice">
                                            <img src={invoice2} alt="" />
                                            <span className="mt-3">Invoice 2</span>
                                        </div>
                                        <div className="invoice">
                                            <img src={invoice3} alt="" />
                                            <span className="mt-3">Invoice 3</span>
                                        </div>
                                    </div>
                                    <div className="invoice-header-view">
                                        <span>Weight Reports</span>
                                    </div>
                                    <div className="invoice-list">
                                        <div className="invoice">
                                            <img src={invoice1} alt="" />
                                            <span className="mt-3">Report 1</span>
                                        </div>
                                        <div className="invoice">
                                            <img src={invoice2} alt="" />
                                            <span className="mt-3">Report 2</span>
                                        </div>
                                    </div> */}
                                        <div className="invoice-header-view">
                                            <span>Invoice</span>
                                        </div>
                                        <div className="grid-container">
                                            {uploadedDocument.map((item, index) => {
                                                const fileExtension = item.file.split(".").pop();
                                                const isPdf = fileExtension === "pdf";

                                                return (
                                                    <div key={index} className="grid-item">
                                                        {/* Checkbox in the top-right corner */}
                                                        <div className="checkbox-container">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedIds.includes(item.id)} // Check if the ID is in selectedIds
                                                                onChange={() => handleCheckboxChange(item.id)} // Pass only the ID
                                                            />
                                                        </div>
                                                        <a
                                                            href={item.file}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="file-link"
                                                        >
                                                            <img
                                                                src={isPdf ? pdficon : wordicon}
                                                                alt="File Icon"
                                                                className="file-icon"
                                                            />
                                                            <div className="file-info">
                                                                <span className="file-title">{item.name}</span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Category Name÷ */}
                                        {/* <div className="grid-container">
                                            {Object.entries(
                                                uploadedDocument.reduce((acc, item) => {
                                                    const { categoryId } = item;
                                                    if (!acc[categoryId]) {
                                                        acc[categoryId] = [];
                                                    }
                                                    acc[categoryId].push(item);
                                                    return acc;
                                                }, {})
                                            ).map(([categoryId, items]) => (
                                                <div key={categoryId} className="category-section">
                                                    <p>Category: Category1</p>
                                                    <div className="category-grid">
                                                        {items.map((item, index) => {
                                                            const fileExtension = item.file.split(".").pop();
                                                            const isPdf = fileExtension === "pdf";
                                                            return (
                                                                <div key={index} className="grid-item">
                                                                    <a
                                                                        href={item.file}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="file-link"
                                                                    >
                                                                        <img
                                                                            src={isPdf ? pdficon : wordicon}
                                                                            alt="File Icon"
                                                                            className="file-icon"
                                                                        />
                                                                        <div className="file-info">
                                                                            <span className="file-title">{item.name}</span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Documentmodal show={show} handleClose={handleClose} OrderId={OrderId} order={order} fetchDocument={fetchDocument} />
                    </div>
                }
            </div>
        </>
    )
}
export default OrderView;