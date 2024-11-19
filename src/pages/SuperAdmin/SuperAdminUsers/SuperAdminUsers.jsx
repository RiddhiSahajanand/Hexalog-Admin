
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import FilterIcon from "../../../assets/filter.png";
import searchIcon from "../../../assets/search.png";
import ArrowLeft from "../../../assets/arrow-left.png";
import ArrowRight from "../../../assets/arrow-right.png";
import Checkboxicn from "../../../assets/Checkbox.png";
import Deleteicon from "../../../assets/deleteicon.png";
import { Axios } from "../../../config/config";
import { Dropdown, Form } from "react-bootstrap";
import DeleteModal from "../../../component/Modal/delete/DeleteModal";
import toast from "react-hot-toast";
import ViewUser from "../../../component/offcanvas/Users/ViewUser";
import { useNavigate } from "react-router-dom";

const SuperAdminUsers = () => {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const [selectedOption, setSelectedOption] = useState("defalut");
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [detailData, setDetailData] = useState({});
    const [detailShow, setDetailShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setDeleteShow(false);
        setDetailShow(false);
    }
    const token = localStorage.getItem("superadmin-login-token");

    const fetchData = async (page) => {
        setLoading(true);

        try {
            let url = `/users?page=${page}&limit=10`;

            // Append 'active' parameter only if selectedOption is "1" or "0"
            if (selectedOption === "1" || selectedOption === "0") {
                url += `&active=${selectedOption}`;
            }

            const response = await Axios.get(url, {
                headers: {
                    "access-token": `${token}`,
                },
            });

            setUsersData(response.data?.users || []);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/super-admin/login");
            } else {
                setError(error.message);
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
            setUsersData(prevData =>
                prevData.map(user =>
                    user.id === id ? { ...user, status: newStatus === 1 ? "ACTIVE" : "INACTIVE" } : user
                )
            );
            fetchData(1);
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };


    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, selectedOption]);

    const handleDelete = async () => {
        try {
            const { data } = await Axios.delete(`/users/${deleteId}`, {
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


    const columns = [
        { name: '', selector: (_, index) => <img src={Checkboxicn} />, width: '100px' },
        { name: 'ID', selector: (_, index) => index + 1 },
        { name: 'Name', selector: row => row.name, width: '200px' },
        { name: 'Email', selector: row => row.email, width: '300px' },
        { name: 'Mobile Number', selector: row => row.phone, width: '300px' },
        { name: 'Last Login', selector: row => row.lastlogin, width: '200px' },
        {
            name: 'Actions',
            selector: row => (
                <>
                    <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-between gap-3">
                            <Form.Check
                                type="switch"
                                id={`custom-switch-${row.id}`}
                                checked={row.status === "ACTIVE"}
                                onChange={() => handleStatusChange(row.id, row.status)}
                            />
                            <img src={Deleteicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                                onClick={() => {
                                    setDeleteShow(true);
                                    setDeleteId(row.id);
                                }} />
                            <i class="bi bi-eye-fill" style={{ fontSize: '1.3rem', color: '#484141', cursor: 'pointer' }}
                                onClick={() => {
                                    setDetailShow(true);
                                    setDetailData(row);
                                }}>
                            </i>
                        </div>
                    </div>
                </>
            ),
            width: '200px'
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

    return (
        <div>
            <div className="user-bg-plan">
                <div className="container-table ms-0" >
                    <h3 className="users-title mb-4">Users</h3>
                    <div className="d-flex ">
                        <div className="alphabet-filter d-flex flex-column me-3">
                            <span style={{ cursor: 'pointer', color: '#442A59', fontWeight: 'bold' }}>A-Z</span>
                            <span style={{ cursor: 'pointer', color: '#744C89', fontSize: '20px' }} className="px-2">*</span>
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                <span key={letter} className="alphabet-link my-0 px-2" style={{ cursor: 'pointer', color: '#744C89' }} onClick={() =>
                                    handleFilterLetter(letter)}>
                                    {letter}
                                </span>
                            ))}
                        </div>
                        <div className="table-data-section">
                            <div className="d-flex align-items-center mb-5 gap-2 ps-lg-3">
                                <div className="input-group custom-search-box">
                                    <span className="input-text bg-white border-0">
                                        <img src={searchIcon} alt="" style={{ height: '16px' }} />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control custom-placeholder border-0"
                                        placeholder="Search by name or ID"
                                        style={{ color: '#B4B4B4' }}
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
                            <div className="card-body ps-lg-3">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p>Error: {error}</p>
                                ) : (
                                    <div>
                                        <DataTable
                                            columns={columns}
                                            data={usersData}
                                            customStyles={customStyles}
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
            <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} />
            <ViewUser show={detailShow} handleClose={handleClose} detailData={detailData} />
        </div>
    );
};

export default SuperAdminUsers;
