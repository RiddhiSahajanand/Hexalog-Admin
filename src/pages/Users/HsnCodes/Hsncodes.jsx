
// import React, { useEffect, useState } from 'react';

// const hsn_codes = () => {

//     const data = [
//         { hsn_code: '1234', description: 'Beverages', igst: '18%', basic_duty_sch: '15%', duty_percent: '20%', sws: '10%', chapter: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
//         { hsn_code: '4321', description: 'Electronics', igst: '20%', basic_duty_sch: '25%', duty_percent: '10%', sws: '5%', chapter: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
//         { hsn_code: '5678', description: 'Apparel', igst: '10%', basic_duty_sch: '30%', duty_percent: '5%', sws: '15%', chapter: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
//         { hsn_code: '8765', description: 'Furniture', igst: '15%', basic_duty_sch: '10%', duty_percent: '25%', sws: '20%', chapter: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
//         { hsn_code: '2468', description: 'Toys', igst: '12%', basic_duty_sch: '5%', duty_percent: '30%', sws: '8%', chapter: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
//     ];

//     return (
//         <div>
//             <div>
//                 <span className='user-dashboard-title'>HSN Codes</span>
//                 <p className='user-description'>Search by HSN code or product name</p>
//                 <input type="text" className='form-control user-search-box' placeholder='Search by HSN code or product name' />
//                 <div className="mt-4">
//                     <div className="table-container">
//                         <table className="custom-table">
//                             <thead>
//                                 <tr>
//                                     <th>HSN Code</th>
//                                     <th>Product<br /> Description</th>
//                                     <th>igst Rates</th>
//                                     <th>Import Duty</th>
//                                     <th>Customs Duty</th>
//                                     <th>Excise Duty</th>
//                                     <th>Regulatory <br />Info</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.hsn_code}</td>
//                                         <td style={{ color: '#000' }}>{item.description}</td>
//                                         <td>{item.igst}</td>
//                                         <td>{item.basic_duty_sch}</td>
//                                         <td>{item.duty_percent}</td>
//                                         <td>{item.sws}</td>
//                                         <td style={{ width: '280px' }}>
//                                             {item.chapter}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     ); 
// };

// export default hsn_codes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const Hsncodes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([
        { hsn_code: "1234", description: "Beverages", igst: "18%", basic_duty_sch: "15%", duty_percent: "20%", sws: "10%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printingLorem Ipsum is simply dummy text of the printingLorem Ipsum is simply dummy text of the printing" },
        { hsn_code: "4321", description: "Electronics", igst: "20%", basic_duty_sch: "25%", duty_percent: "10%", sws: "5%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
        { hsn_code: "5678", description: "Apparel", igst: "10%", basic_duty_sch: "30%", duty_percent: "5%", sws: "15%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
        { hsn_code: "8765", description: "Furniture", igst: "15%", basic_duty_sch: "10%", duty_percent: "25%", sws: "20%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
        { hsn_code: "2468", description: "Toys", igst: "12%", basic_duty_sch: "5%", duty_percent: "30%", sws: "8%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
    ]);

    console.log('====================================');
    console.log("searchTerm", searchTerm);
    console.log('====================================');



    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(e.target.value);

        if (!value) {
            defaultSearchData();
            return;
        }

        try {
            let response;

            const numericValue = value.replace(/\s+/g, '');
            if (/^\d+$/.test(numericValue)) {
                response = await axios.get(`${API_URL}/duty-data/hsn?hsnCode=${value}`);
                console.log('====================================');
                console.log("numericValueresponse", response);
                console.log('====================================');
                setData(response?.data?.data);
            } else {
                response = await axios.get(`${API_URL}/duty-data/search?searchTerm=${value}`);
                console.log('====================================');
                console.log("searchTermRessss", response?.data?.data);
                console.log('====================================');

                setData(response?.data?.data?.hits);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };

    const defaultSearchData = async () => {
        let defaultValue = "00"
        const response = await axios.get(`${API_URL}/duty-data/hsn?hsnCode=${defaultValue}`);
        setData(response?.data?.data);
    }

    useEffect(() => {
        if (!searchTerm) {
            defaultSearchData();
        }
    }, [searchTerm])
    const handleHSNCode = (item) => {
        navigate("/hsn-codes/detail", { state: item })
    }

    return (
        <div>
            <div>
                <h3 className="user-dashboard-title">HSN Codes</h3>
                {/* <p className="user-description">Search by HSN code or product name</p> */}
                {/* <input
                    type="text"
                    className="form-control user-search-box"
                    placeholder="Search by HSN code or product name"
                    value={searchTerm}
                    onChange={handleSearch}
                /> */}
                <input
                    type="text"
                    name="searchTerm"
                    id="searchTerm"
                    className="form-control user-search-box mt-2"
                    placeholder="Search by HSN code or product name"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <div className="mt-4">
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>HSN Code</th>
                                    <th>Product Description</th>
                                    <th>GST Rates</th>
                                    <th>Import Duty</th>
                                    <th>Customs Duty</th>
                                    <th>Excise Duty</th>
                                    <th>Regulatory Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.length > 0 ? (
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: "180px", color: '#9261E0', textDecoration: "underline", cursor: 'pointer' }} onClick={() => handleHSNCode(item)}>{item.hsn_code || " - "}</td>
                                                <td style={{ color: "#000", width: "250px", height: "60px", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "center" }}>
                                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", whiteSpace: "normal" }}>
                                                        {item.description}
                                                    </div>
                                                </td>
                                                <td style={{ width: "150px" }}>{item.igst || "-"}</td>
                                                <td style={{ width: "150px" }}>{item.basic_duty_sch || "-"}</td>
                                                <td style={{ width: "170px" }}>{item.duty_percent || " - "}</td>
                                                <td style={{ width: "150px" }}>{item.sws || " - "}</td>
                                                <td style={{ height: "60px", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "center" }}>
                                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", whiteSpace: "normal" }}>
                                                        {item.chapter || "-"}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center' }}>No results found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hsncodes;
