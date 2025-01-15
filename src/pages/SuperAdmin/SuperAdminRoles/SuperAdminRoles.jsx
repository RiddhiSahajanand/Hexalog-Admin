import DataTable from 'react-data-table-component';
import FilterIcon from "../../../assets/filter.png";
import searchIcon from "../../../assets/search.png";
import { useEffect, useState } from "react";
import { Dropdown, Form } from 'react-bootstrap';
import Deleteicon from "../../../assets/deleteicon.png";
import editicon from "../../../assets/editicon.png";
import eyeicon from "../../../assets/eyeicon.png";
import Checkboxicn from "../../../assets/Checkbox.png";
import { useLocation, useNavigate } from 'react-router-dom';



const SuperAdminRoles = () => {
    const location = useLocation();

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
    const [detailShow, setDetailShow] = useState(false);
    const [categorieShow, setCategoriesShow] = useState(false);
    const [editcategorieShow, setEditCategoriesShow] = useState(false);
    const [editData, setEditData] = useState({});

    const [detailId, setDetailId] = useState(null);
    const [detailData, setDetailData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const deletetext = "role"

    const handleSort = (column, sortDirection) => {
        // fetchData(currentPage, search, firstLetter, column.selector, sortDirection);
        console.log(column, sortDirection);

    };

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


    const handleViewProfile = (row) => {
        // navigate('/user-profile', { state: { user: row.id } });
    };


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
            width: '100px',
            left: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '140px',
            left: true,
        },
        {
            name: 'Permissions List',
            selector: row => row.permissions,
            // width: '760px',
            left: true,
        },

        {
            name: '',
            selector: row => <div></div>,
        },
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

                            <img src={editicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                            // onClick={() => {
                            //     setEditCategoriesShow(true);
                            //     setEditData(row)
                            // }}
                            />

                            <img src={eyeicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                            // onClick={() => handleViewProfile(row)}
                            />


                            <img src={Deleteicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }}
                            // onClick={() => {
                            //     setDeleteShow(true);
                            //     setDeleteId(row.id);
                            // }} 
                            />
                        </div>
                    </div>
                </>
            ),
            width: '150px',
            left: true,
        },
    ];
    const data = [
        { id: 1, name: 'Hardik', permissions: 'All', actions: 'sample text' },
        { id: 2, name: 'Tarun ', permissions: 'Edit', actions: 'sample text' },
        { id: 3, name: 'Riddhi ', permissions: 'Delete', actions: 'sample text' },
        { id: 4, name: 'Nidhi', permissions: 'All', actions: 'sample text' },
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
                backgroundColor: '#fff', // Set the background color of the table to white
            },
        },
    };


    return (
        <div className="user-bg-plan">
            <div className="container-table ms-0" >
                <h3 className="users-title mb-4">Roles</h3>
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
                        {/* <div className="d-flex justify-content-between  mb-5 gap-2 ps-lg-3"> */}
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

                        </div>
                        {/* <div className="card-body ps-lg-3"> */}
                        <div className="card-body">
                            <div>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    customStyles={customStyles}
                                    onSort={handleSort}
                                />

                            </div>

                            {/* <div className="table-container">
                                <table className="responsive-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Permissions List</th>
                                            <th></th>
                                            <th></th>
                                            <th className="actions-column">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row) => (
                                            <tr key={row.id}>
                                                <td style={{ width: '100px', alignItems: 'center' }}>
                                                    <input type="checkbox" className='text-center' />
                                                </td>
                                                <td style={{ width: '100px' }}>{row.id}</td>
                                                <td style={{ width: '100px' }}>{row.name}</td>
                                                <td style={{ width: '250px' }}>{row.permissions}</td>
                                                <td></td>
                                                <td></td>
                                                <td className="actions">
                            <div className="d-flex justify-content-end gap-3">
                                <img src={editicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }} />

                                <img src={eyeicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }} />

                                <img src={Deleteicon} alt="" style={{ height: '1.3rem', cursor: 'pointer' }} />
                            </div>
                        </td>
                    </tr>
                                        ))}
                </tbody>
            </table>
        </div> */}
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
};

export default SuperAdminRoles;
