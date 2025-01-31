

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API_URL } from "../../../config/config";
// import { useNavigate } from "react-router-dom";

// const Hsncodes = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();
//     const [data, setData] = useState([
//         { hsn_code: "1234", description: "Beverages", igst: "18%", basic_duty_sch: "15%", duty_percent: "20%", sws: "10%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printingLorem Ipsum is simply dummy text of the printingLorem Ipsum is simply dummy text of the printing" },
//         { hsn_code: "4321", description: "Electronics", igst: "20%", basic_duty_sch: "25%", duty_percent: "10%", sws: "5%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
//         { hsn_code: "5678", description: "Apparel", igst: "10%", basic_duty_sch: "30%", duty_percent: "5%", sws: "15%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
//         { hsn_code: "8765", description: "Furniture", igst: "15%", basic_duty_sch: "10%", duty_percent: "25%", sws: "20%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
//         { hsn_code: "2468", description: "Toys", igst: "12%", basic_duty_sch: "5%", duty_percent: "30%", sws: "8%", chapter: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
//     ]);

//     const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage((prevPage) => prevPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage((prevPage) => prevPage - 1);
//         }
//     };

//     useEffect(() => {
//         // Fetch new data when page changes (Replace this with actual API call)
//         console.log(`Fetching data for page ${currentPage} with limit ${limit}`);
//     }, [currentPage, limit]);


//     const handleSearch = async (e) => {
//         const value = e.target.value;
//         setSearchTerm(e.target.value);

//         if (!value) {
//             defaultSearchData();
//             return;
//         }

//         try {
//             let response;


//             response = await axios.get(`${API_URL}/duty-data/search?searchTerm=${value}&page=${1}&limit=${10}`);
//             console.log('====================================');
//             console.log("searchTermRessss", response?.data?.data);
//             console.log('====================================');

//             setData(response?.data?.data?.hits);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setData([]);
//         }
//     };

//     const defaultSearchData = async () => {
//         let defaultValue = ""
//         // const response = await axios.get(`${API_URL}/duty-data/hsn?hsnCode=${defaultValue}`);

//         const response = await axios.get(`${API_URL}/duty-data/search?searchTerm=${defaultValue}&page=${1}&limit=${10} `);
//         setData(response?.data?.data);
//     }

//     useEffect(() => {
//         if (!searchTerm) {
//             defaultSearchData();
//         }
//     }, [searchTerm])
//     const handleHSNCode = (item) => {
//         navigate("/hsn-codes/detail", { state: item })
//     }

//     return (
//         <div>
//             <div>
//                 <h3 className="user-dashboard-title">HSN Codes</h3>
//                 {/* <p className="user-description">Search by HSN code or product name</p> */}
//                 {/* <input
//                     type="text"
//                     className="form-control user-search-box"
//                     placeholder="Search by HSN code or product name"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 /> */}
//                 <input
//                     type="text"
//                     name="searchTerm"
//                     id="searchTerm"
//                     className="form-control user-search-box mt-2"
//                     placeholder="Search by HSN code or product name"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 />

//                 <div className="mt-4">
//                     <div className="table-container">
//                         <table className="custom-table">
//                             <thead>
//                                 <tr>
//                                     <th>HSN Code</th>
//                                     <th>Product Description</th>
//                                     <th>GST Rates</th>
//                                     <th>Import Duty</th>
//                                     <th>Customs Duty</th>
//                                     <th>Excise Duty</th>
//                                     <th>Regulatory Info</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data?.length > 0 ? (
//                                     data.map((item, index) => {
//                                         return (
//                                             <tr key={index}>
//                                                 <td style={{ width: "180px", color: '#9261E0', textDecoration: "underline", cursor: 'pointer' }} onClick={() => handleHSNCode(item)}>{item.hsn_code || " - "}</td>
//                                                 <td style={{ color: "#000", width: "250px", height: "60px", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "center" }}>
//                                                     <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", whiteSpace: "normal" }}>
//                                                         {item.description}
//                                                     </div>
//                                                 </td>
//                                                 <td style={{ width: "150px" }}>{item.igst || "-"}</td>
//                                                 <td style={{ width: "150px" }}>{item.basic_duty_sch || "-"}</td>
//                                                 <td style={{ width: "170px" }}>{item.duty_percent || " - "}</td>
//                                                 <td style={{ width: "150px" }}>{item.sws || " - "}</td>
//                                                 <td style={{ height: "60px", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "center" }}>
//                                                     <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", whiteSpace: "normal" }}>
//                                                         {item.chapter || "-"}
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         )
//                                     })
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="7" style={{ textAlign: 'center' }}>No results found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                         {/* Pagination Controls */}
//                         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
//                             <button
//                                 onClick={handlePrevPage}
//                                 disabled={currentPage === 1}
//                                 style={{ marginRight: "10px", padding: "8px 12px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
//                             >
//                                 Previous
//                             </button>
//                             <span>Page {currentPage} of {totalPages}</span>
//                             <button
//                                 onClick={handleNextPage}
//                                 disabled={currentPage === totalPages}
//                                 style={{ marginLeft: "10px", padding: "8px 12px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Hsncodes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";
import ArrowLeft from "../../../assets/arrow-left.png";
import ArrowRight from "../../../assets/arrow-right.png";

import { useLocation, useNavigate } from "react-router-dom";


const Hsncodes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const page = localStorage.getItem("savedPage");
    const savedPage = localStorage.getItem("savedPage");
    const initialPage = savedPage ? JSON.parse(savedPage) : 1; // Ensure parsing and fallback to 1
    // const [savedPage, setSavedPage] = useState(1 || page);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [pageInput, setPageInput] = useState("");
    const limit = 10;

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/duty-data/search`, {
                params: { searchTerm, page: currentPage, limit }
            });
            setData(response.data.data || []);
            setTotalPages(response.data.metaData.totalPages || 1);
            localStorage.setItem("savedPage", JSON.stringify(currentPage));

        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleHSNCode = (item) => {
        navigate("/hsn-codes/detail", { state: item });
        localStorage.setItem("CurrentPage", currentPage);
    };

    const handlePageInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageInputSubmit = (e) => {
        e.preventDefault();
        const page = parseInt(pageInput, 10);
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 6;

        // Always show the first page
        pages.push(
            <button
                key={1}
                onClick={() => setCurrentPage(1)}
                className={`btn ${currentPage === 1 ? 'active' : ''}`}
                style={{
                    backgroundColor: currentPage === 1 ? '#9b5fc9' : '#F3F5FF',
                    color: currentPage === 1 ? '#F3F5FF' : '#9b5fc9',
                    margin: '0 0px',
                    fontWeight: '500'
                }}
            >
                1
            </button>
        );

        // Show ellipsis if current page is far from the start
        if (currentPage > maxPagesToShow) {
            pages.push(<span key="start-ellipsis" style={{ margin: '0 5px' }}>...</span>);
        }

        // Show pages around the current page
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`btn ${currentPage === i ? 'active' : ''}`}
                    style={{
                        backgroundColor: currentPage === i ? '#9b5fc9' : '#F3F5FF',
                        color: currentPage === i ? '#F3F5FF' : '#9b5fc9',
                        margin: '0 5px',
                        fontWeight: '500'
                    }}
                >
                    {i}
                </button>
            );
        }

        // Show ellipsis if current page is far from the end
        if (currentPage < totalPages - maxPagesToShow + 1) {
            pages.push(<span key="end-ellipsis" style={{ margin: '0 5px' }}>...</span>);
        }

        // Always show the last page
        if (totalPages > 1) {
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`btn ${currentPage === totalPages ? 'active' : ''}`}
                    style={{
                        backgroundColor: currentPage === totalPages ? '#9b5fc9' : '#F3F5FF',
                        color: currentPage === totalPages ? '#F3F5FF' : '#9b5fc9',
                        margin: '0 5px',
                        fontWeight: '500'
                    }}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };
    return (
        <div>
            <h3 className="user-dashboard-title">HSN Codes</h3>
            <input
                type="text"
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
                                <th>HSN <br /> Code</th>
                                <th>Product <br /> Description</th>
                                <th>GST <br /> Rates</th>
                                <th>Import <br /> Duty</th>
                                <th>Customs <br /> Duty</th>
                                <th>Excise  <br />Duty</th>
                                <th>Regulatory <br />Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ width: "150px", color: '#9261E0', textDecoration: "underline", cursor: 'pointer' }} onClick={() => handleHSNCode(item)}>{item.hsn_code || " - "}</td>
                                        <td style={{ color: "#000", width: "350px", height: "60px", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "center" }}>
                                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", whiteSpace: "normal" }}>
                                                {item.Item_Description}
                                            </div>
                                        </td>
                                        <td style={{ width: "120px" }}>{item.IGST || "-"}</td>
                                        <td style={{ width: "120px" }}>{item.basic_duty_sch || "-"}</td>
                                        <td style={{ width: "120px" }}>{item.duty_percent || " - "}</td>
                                        <td style={{ width: "120px" }}>{item.sws || " - "}</td>
                                        <td style={{ height: "60px", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "center" }}>
                                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", whiteSpace: "normal" }}>
                                                {item.chapter || "-"}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginRight: '40px', marginBottom: '20px' }} className="pagination-container">
                    <button
                        type="button"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn"
                        style={{ backgroundColor: '#9b5fc9', color: '#F3F5FF', fontWeight: '500' }}
                    >
                        <img src={ArrowLeft} alt="" style={{ paddingRight: '10px' }} />
                        Previous
                    </button>
                    <div style={{ margin: "50px" }}>
                        {renderPageNumbers()}

                        <form onSubmit={handlePageInputSubmit} style={{ display: 'inline' }}>
                            <input
                                type="text"
                                value={pageInput}
                                onChange={handlePageInputChange}
                                min="1"
                                max={totalPages}
                                style={{ width: '50px', margin: '10px', border: '1px solid #9b5fc9', }}
                            />
                        </form>
                    </div>
                    <button
                        type="button"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn"
                        style={{ backgroundColor: '#9b5fc9', color: '#F3F5FF', fontWeight: '500' }}
                    >
                        Next
                        <img src={ArrowRight} alt="" style={{ paddingLeft: '10px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hsncodes;