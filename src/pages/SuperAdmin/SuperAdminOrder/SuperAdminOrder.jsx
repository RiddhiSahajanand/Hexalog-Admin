import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import FilterIcon from "../../../assets/filter.png";
import searchIcon from "../../../assets/search.png";
import ArrowLeft from "../../../assets/arrow-left.png";
import ArrowRight from "../../../assets/arrow-right.png";
import Checkboxicn from "../../../assets/Checkbox.png";
import Deleteicon from "../../../assets/deleteicon.png";
import editicon from "../../../assets/editicon.png";
import eyeicon from "../../../assets/eyeicon.png";
import docicon from "../../../assets/doc-icon.png";


import plusicon from "../../../assets/plus-icon.png";

import { Axios } from "../../../config/config";
import { Dropdown, Form } from "react-bootstrap";
import DeleteModal from "../../../component/Modal/delete/DeleteModal";
import toast from "react-hot-toast";
import ViewUser from "../../../component/offcanvas/Users/ViewUser";
import { useLocation, useNavigate } from "react-router-dom";
import AddCategories from "../../../component/Modal/categories/AddCategories";
import EditCategories from "../../../component/Modal/categories/EditCategories";
import AddOrder from "../../../component/Modal/order/AddOrder";
import ViewOrder from "../../../component/Modal/order/ViewOrder";
import moment from "moment";

const SuperAdminOrder = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);
    const [search, SetSearch] = useState("");
    const [firstLetter, setfirstLetter] = useState("");
    const [sort, setSort] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const [selectedOption, setSelectedOption] = useState(
        location.state?.selectedOption === "1" ? "1" : "default"// Use "1" as the default if null or undefined
    );
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [addorderShow, setAddOrderShow] = useState(false);
    const [viewOrderShow, setViewOrderShow] = useState(false);
    const [detailData, setDetailData] = useState({});


    const handleClose = () => {
        setDeleteShow(false);
        setViewOrderShow(false);
        setAddOrderShow(false);
    }
    const token = localStorage.getItem("superadmin-login-token");

    const fetchData = async (page, search, firstLetter) => {
        setLoading(true);

        try {
            let url = `/orders?page=${page}&limit=10`;


            if (search) url += `&search=${search}`;
            if (firstLetter) url += `&firstLetterNameFilter=${firstLetter}`;
            if (selectedOption === "1" || selectedOption === "0") {
                url += `&active=${selectedOption}`;
            }

            const response = await Axios.get(url, {
                headers: {
                    "access-token": `${token}`,
                },
            });

            setOrderData(response.data?.orders || []);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/super-admin/login");
            }
            else {
                setError(error.message);
            }

            if (error.response.data.success === false) {
                // alert(error.response.data.message);

                toast.error(error.response.data.message);
                navigate("/super-admin/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === "ACTIVE" ? 0 : 1;

        try {
            await Axios.patch(
                `/users/${id}/status`,
                { status: newStatus },
                {
                    headers: {
                        "access-token": token,
                    },
                }
            );

            localStorage.removeItem("user-login-token");

            setOrderData(prevData =>
                prevData.map(user =>
                    user.id === id ? { ...user, status: newStatus === 1 ? "ACTIVE" : "INACTIVE" } : user
                )
            );
            fetchData(1);
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };


    const handleSort = (column, sortDirection) => {
        // fetchData(currentPage, search, firstLetter, column.selector, sortDirection);
        console.log(column, sortDirection);

    };

    useEffect(() => {
        fetchData(currentPage, search, firstLetter, sort);
    }, [currentPage, selectedOption, search, firstLetter, sort]);

    const handleDelete = async () => {
        try {
            const { data } = await Axios.delete(`/categories/${deleteId}`, {
                headers: { "access-token": token },
            })
            if (data?.status) {
                toast.success(data?.message);
                fetchData(1);
                handleClose();
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };


    const handleViewOrder = (row) => {
        setViewOrderShow(true);
        setDetailData(row)
    };
    const handleOrderDetail = (row) => {
        // navigate('/order/view', { state: { user: row.id } });
        navigate('/order/view', { state: row });
    }

    const columns = [
        {
            name: '',
            selector: (_, index) => <img src={Checkboxicn} />,
            width: '100px',
            center: true,
        },
        {
            name: 'ID',
            selector: (_, index) => index + 1,
            width: '80px',
            left: true,
        },
        {
            name: 'Order ID',
            selector: row => `#${row?.id}`,
            sortable: true,
            width: '360px',
            left: true,
        },
        {
            name: 'Name',
            selector: row => row?.name,
            sortable: true,
            width: '140px',
            left: true,
        },
        {
            name: 'Order Date and Time', selector: row => {
                const date = new Date(row.updatedAt);
                const formattedDate = date.toISOString().split('T')[0];
                const time = date.toTimeString().split(' ')[0];
                return `${formattedDate} ${time}`;
            },
            // width: '185px',
            sortable: true,
        },
        // {
        //     name: '',
        //     left: true,
        // },
        {
            name: 'Actions',
            selector: row => (
                <>
                    <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-between gap-3">
                            {/* <Form.Check
                                type="switch"
                                id={`custom-switch-${row.id}`}
                                checked={row.status === "ACTIVE"}
                            // onChange={() => handleStatusChange(row.id, row.status)}
                            /> */}

                            {/* <img src={editicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                            // onClick={() => {
                            //     setEditCategoriesShow(true);
                            //     setEditData(row)
                            // }}
                            /> */}

                            <img src={eyeicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                                onClick={() => handleViewOrder(row)}
                            />
                            <img src={docicon} alt="" style={{ cursor: 'pointer', height: '1.5rem' }}
                                onClick={() => handleOrderDetail(row)}
                            />

                            {/* <img src={Deleteicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                                onClick={() => {
                                    setDeleteShow(true);
                                    setDeleteId(row.id);
                                }}
                            /> */}
                        </div>
                    </div>
                </>
            ),
            width: '120px',
            left: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: '400',
                color: '#B4B4B4',
                backgroundColor: '#fff',
            },
        },
        cells: {
            style: {
                color: '#442A59',
                fontSize: '16px',
            },
        },
        table: {
            style: {
                backgroundColor: '#fff',
            },
        },
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFilterLetter = (Chars) => {

        if (Chars === "*") {
            // Reset all filters to default values
            SetSearch("");
            setfirstLetter("");
            setSelectedOption("defalut");
            fetchData(1, "", "", ""); // Fetch data with cleared filters
        }
    }

    const renderPaginationButtons = () => {
        const pageButtons = [];
        const showEllipsis = totalPages > 5;
        const maxPageDisplay = 3;

        pageButtons.push(
            <div
                key={1}
                onClick={() => handlePageChange(1)}
                style={{
                    backgroundColor: currentPage === 1 ? '#E4D3FF' : 'transparent',
                    color: '#5f4b66',
                    cursor: 'pointer',
                    padding: '8px 15px',
                    borderRadius: '5px',
                }}
            >
                1
            </div>
        );

        if (showEllipsis && currentPage > maxPageDisplay + 1) {
            pageButtons.push(<span key="ellipsis1" style={{ padding: '0 8px' }}>...</span>);
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <div
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                        backgroundColor: currentPage === i ? '#E4D3FF' : 'transparent',
                        color: '#5f4b66',
                        cursor: 'pointer',
                        padding: '8px 15px',
                        borderRadius: '5px',
                    }}
                >
                    {i}
                </div>
            );
        }

        if (showEllipsis && currentPage < totalPages - maxPageDisplay) {
            pageButtons.push(<span key="ellipsis2" style={{ padding: '0 8px' }}>...</span>);
        }

        if (totalPages > 1) {
            pageButtons.push(
                <div
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    style={{
                        backgroundColor: currentPage === totalPages ? '#E4D3FF' : 'transparent',
                        color: '#5f4b66',
                        cursor: 'pointer',
                        padding: '8px 15px',
                        borderRadius: '5px',
                    }}
                >
                    {totalPages}
                </div>
            );
        }
        return pageButtons;
    };
    const handleClickToAddOrder = () => {
        setAddOrderShow(true);
    }
    const handleSubmit = () => {
        setAddOrderShow(false);
    }
    return (
        <div>
            <div className="user-bg-plan">
                <div className="container-table ms-0" >
                    <h3 className="users-title mb-4">Orders</h3>
                    <div className="d-flex ">
                        {/* <div className="alphabet-filter d-flex flex-column me-3">
                            <span style={{ cursor: 'pointer', color: '#442A59', fontWeight: 'bold' }}>A-Z</span>
                            <span style={{ cursor: 'pointer', color: '#744C89', fontSize: '20px' }} className="px-2"
                                onClick={() => handleFilterLetter("*")}
                            >*</span>
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                <span key={letter} className="alphabet-link my-0 px-2" style={{ cursor: 'pointer', color: '#744C89' }} onClick={() => {
                                    handleFilterLetter(letter)
                                    setfirstLetter(letter)
                                }
                                }>
                                    {letter}
                                </span>
                            ))}
                        </div> */}
                        <div className="table-data-section">
                            <div className="d-flex justify-content-between  mb-5 gap-2">
                                <div className="d-flex align-items-center filtersection-view">
                                    <div className="input-group custom-search-box">
                                        <span className="input-text bg-white border-0">
                                            <img src={searchIcon} alt="" style={{ height: '16px' }} />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control custom-placeholder border-0"
                                            placeholder="Search by name or ID"
                                            style={{ color: '#B4B4B4' }}
                                            onChange={(e) => SetSearch(e.target.value)}
                                            onFocus={(e) => e.target.classList.add('no-border')}
                                            onBlur={(e) => e.target.classList.remove('no-border')}
                                        />
                                    </div>
                                    <div class="dropdown-center">
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                <button id="dropdown-basic" className="px-3" style={{ paddingTop: '6px', paddingBottom: '6px', border: '2px solid #E7EAEE', borderRadius: '4px', backgroundColor: '#FFF', color: '#B4B4B4' }}  >
                                                    <img src={FilterIcon} className="filter-icon" alt="Filter Icon" style={{ marginRight: '10px' }} />
                                                    Filter</button>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu style={{ borderRadius: '8px', width: '50px', color: '#4c227f', cursor: 'pointer' }} >
                                                <p className="text-center pt-3"
                                                    onClick={() => {
                                                        setSelectedOption("defalut");
                                                        document.body.click(); // Close dropdown
                                                    }}>All</p>
                                                <p className="text-center" onClick={() => {
                                                    setSelectedOption("1");
                                                    document.body.click();
                                                }}>Active</p>
                                                <p
                                                    className="text-center"
                                                    onClick={() => {
                                                        setSelectedOption("0");
                                                        document.body.click();
                                                    }}>
                                                    Deactive
                                                </p>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            padding: '3px 20px 3px 20px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#744C89',
                                            color: '#fff',
                                            fontWeight: '600',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            height: '40px'
                                        }}
                                        onClick={handleClickToAddOrder}
                                    >
                                        <img src={plusicon} alt="" style={{ height: '12px', width: '22px', paddingRight: '10px' }} />
                                        <span>New</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p>Error: {error}</p>
                                ) : (
                                    <div>
                                        <DataTable
                                            columns={columns}
                                            data={orderData}
                                            customStyles={customStyles}
                                            onSort={handleSort}
                                        />
                                        <div className="pagination-container">
                                            <button
                                                type="button"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="btn"
                                                style={{ backgroundColor: '#9b5fc9', color: '#F3F5FF', fontWeight: '500' }}
                                            >
                                                <img src={ArrowLeft} alt="" style={{ paddingRight: '10px' }} />
                                                Previous
                                            </button>

                                            {/* <div className="d-flex">
                                                {renderPaginationButtons()}
                                            </div> */}

                                            <button
                                                type="button"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="btn"
                                                style={{ backgroundColor: '#9b5fc9', color: '#F3F5FF', fontWeight: '500' }}
                                            >
                                                Next
                                                <img src={ArrowRight} alt="" style={{ paddingLeft: '10px' }} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} /> */}
            <AddOrder show={addorderShow} handleClose={handleClose} handleSubmit={handleSubmit} fetchData={fetchData} />
            <ViewOrder show={viewOrderShow} handleClose={handleClose} handleSubmit={handleSubmit} detailData={detailData} />
        </div>
    );
};

export default SuperAdminOrder;
