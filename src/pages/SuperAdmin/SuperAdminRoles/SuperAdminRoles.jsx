import DataTable from 'react-data-table-component';
import FilterIcon from "../../../assets/filter.png";
import searchIcon from "../../../assets/search.png";
import { useState } from "react";
import { Dropdown } from 'react-bootstrap';

const SuperAdminRoles = () => {
    const [isMobile, setIsMobile] = useState(false);



    const columns = [
        { name: 'ID', selector: row => row.id, },
        { name: 'Name', selector: row => row.name, },
        { name: 'Permissions List', selector: row => row.permissions, },
        { name: 'Actions', selector: row => row.actions, },
    ];

    const data = [
        { id: 1, name: 'Hardik Patel', permissions: 'All', actions: 'sample text' },
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
        <div>
            <div className="roles-bg-plan">
                <div className="table-data-section">
                    <h3 className="users-title mb-4">Roles</h3>

                    <div className="d-flex align-items-center mb-5 gap-2 ps-lg-5 ">
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


                                {/* <Dropdown.Menu style={{ borderRadius: '8px', width: '50px', color: '#4c227f', cursor: 'pointer' }} >
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
                                </Dropdown.Menu> */}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="card-body ps-lg-5">
                        <DataTable
                            columns={columns}
                            data={data}
                            selectableRows
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminRoles;
