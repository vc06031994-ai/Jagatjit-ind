import React, { useState, useEffect } from 'react';
import { client } from '../../../api/contentful.js';
import noteImg from '../../../Assets/Reports/report.png';
import { GrPhone } from "react-icons/gr";
import { HiSortDescending } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import "./Financial.css"

// Initialize Contentful client


const Report = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [fileName, setFileName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [years, setYears] = useState([]);

  const currentYear = new Date().getFullYear();

  const parseRichText = (node) => {
    if (!node) return '';
    if (node.nodeType === 'text') {
      return node.value;
    }
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(parseRichText).join('');
    }
    return '';
  };

  useEffect(() => {
    const fetchAllEntries = async () => {
      try {
        let allEntries = [];
        let skip = 0;
        let total = 0;
  
        do {
          const response = await client.getEntries({
            content_type: 'financialPage',
            limit: 100, // Maximum allowed by Contentful API
            skip,
          });
  
          total = response.total; // Total number of entries
          skip += response.items.length; // Increment skip by the number of items fetched
          allEntries = [...allEntries, ...response.items]; // Merge new entries into the array
        } while (skip < total);
  
        const data = allEntries.map((item) => ({
          file_name: item.fields.fileName,
          category_name: item.fields.categoryName,
          file_description: item.fields.fileDescription,
          file_date: item.fields.fileDate,
          file_url: item.fields.fileUrl?.fields?.file?.url || null,
          html_content: parseRichText(item.fields.htmlfield),
          created_at: item.sys.createdAt, // Adding createdAt property
        })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date
  
        setReports(data);
        setFilteredReports(data);
  
        // Extract unique valid years
        const uniqueYears = [...new Set(data
          .map((report) => {
            const year = new Date(report.file_date).getFullYear();
            return isNaN(year) ? null : year; // Filter out invalid years
          })
          .filter((year) => year !== null) // Remove `null` years
        )].sort((a, b) => b - a); // Sort descending
  
        setYears(uniqueYears);
  
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((report) => report.category_name))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchAllEntries();
  }, []);
  
  

  const filterReports = () => {
    let filtered = reports;
  
    if (fileName) {
      filtered = filtered.filter(report => report.file_name.toLowerCase().includes(fileName.toLowerCase()));
    }
    if (categoryName && categoryName !== "") { // Handle "All" for category
      filtered = filtered.filter(report => report.category_name === categoryName);
    }
    if (month && month !== "") {  // Handle "All" for month
      filtered = filtered.filter(report => new Date(report.file_date).getMonth() + 1 === parseInt(month));
    }
    if (year && year !== "all") {  // Handle "All" option for year
      filtered = filtered.filter(report => new Date(report.file_date).getFullYear() === parseInt(year));
    }
  
    filtered = filtered.sort((a, b) => new Date(b.file_date) - new Date(a.file_date));
    setFilteredReports(filtered);
  };
  

  useEffect(() => {
    filterReports();
  }, [fileName, categoryName, month, year, reports]);

  const handleMonthChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1 || value > 12) {
      setMonthError('Month must be between 1 and 12');
    } else {
      setMonthError('');
      setMonth(e.target.value);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setYear('');  // Clear the year filter when "All" is selected
    } else if (parseInt(value) > currentYear) {
      setYearError(`Year must not exceed ${currentYear}`);
    } else {
      setYearError('');
      setYear(value);
    }
  };
  const handleReportClick = (report) => {
    if (report.file_url) {
      window.open(report.file_url, '_blank'); // Directly open the file URL in a new tab
    } else if (report.html_content) {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(report.html_content);
      newWindow.document.close();
    }
  };
  

  return (
    <>
      <div className="text-center food-hero our-process financial-hero">
        <h1 className="heading-top">Financial</h1>
        <p className="firstDivParagraph">Our yearly reports</p>
      </div>
      <div className="container">
      <div className="row g-3 mb-4">
        {/* Search Input */}
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Reports"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <span className="input-group-text"><IoIosSearch style={{ color: 'black', fontSize: '21px' }} /></span>
          </div>
        </div>

        {/* Year Filter */}
        <div className="col-md-2">
          <div className="input-group">
            <select className="form-select" onChange={handleYearChange} value={year || 'all'}>
             
              <option value="" disabled>By Year</option>
              <option value="all">All</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
            <span className="input-group-text"><CiFilter style={{ color: 'black', fontSize: '21px' }} /></span>
          </div>
          {yearError && <span className="text-danger">{yearError}</span>}
        </div>

        {/* Month Filter */}
        <div className="col-md-2">
  <div className="input-group">
    <select className="form-select" value={month} onChange={handleMonthChange} defaultValue="">
      <option value="" disabled>By Month</option>
      <option value="">All</option> {/* Add "All" option */}
      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((monthName, index) => (
        <option key={index} value={index + 1}>{monthName}</option>
      ))}
    </select>
    <span className="input-group-text"><CiFilter style={{ color: 'black', fontSize: '21px' }} /></span>
  </div>
  {monthError && <span className="text-danger">{monthError}</span>}
</div>

        {/* Category Filter */}
        <div className="col-md-4">
  <div className="input-group">
    <select className="form-select" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
      <option value="">All</option>
      {categories.map((category, index) => (
        category && <option key={index} value={category}>{category}</option>
      ))}
    </select>
    <span className="input-group-text"><HiSortDescending style={{ color: 'black', fontSize: '21px' }} /></span>
  </div>
</div>
      </div>

        {/* Display Reports */}
        <div className="row finance-col">
          {filteredReports.length > 0 ? (
            filteredReports.map((report, idx) => (
              <div key={idx} className="col-lg-2 col-md-4 col-6 mb-4 ">
                <div
                  className="card bg-dark text-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleReportClick(report)}
                >
                  <img src={noteImg} alt="report" className="img-fluid" />
                  <div className="card-body">
                    <h5 className="card-title mt-3">{report.file_name}</h5>
                    <p className="card-text ">{report.file_date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <h1 className="text-center">No reports found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;

