import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noteImg from '../../../Assets/Reports/report.png';
import { GrPhone } from "react-icons/gr";
import { HiSortDescending } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    axios.get('https://api.jagatjit.com/api/financials')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          let data = response.data.data.sort((a, b) => new Date(b.file_date) - new Date(a.file_date));
          setReports(data);
          setFilteredReports(data);

          // Extract unique category names
          const uniqueCategories = [...new Set(data.map(report => report.category_name))];
          setCategories(uniqueCategories);
        } else {
          console.error('API response does not contain an array');
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filterReports = () => {
    let filtered = reports;

    if (fileName) {
      filtered = filtered.filter(report => report.file_name.toLowerCase().includes(fileName.toLowerCase()));
    }
    if (categoryName) {
      filtered = filtered.filter(report => report.category_name === categoryName);
    }
    if (month) {
      filtered = filtered.filter(report => new Date(report.file_date).getMonth() + 1 === parseInt(month));
    }
    if (year) {
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
    const value = parseInt(e.target.value);
    if (value > currentYear) {
      setYearError(`Year must not exceed ${currentYear}`);
    } else {
      setYearError('');
      setYear(e.target.value);
    }
  };

  return (
    <>
    <div className='text-center  food-hero our-process financial-hero'>
        <h1  className="heading-top">Report and Policies</h1>
        <p class="firstDivParagraph">Our yearly reports</p>
      </div>
    <div className='container'>
      <div className='row mb-3'>
        <div className='col-md-4 mb-3'>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Search Reports" 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value)} 
              className="form-control" 
            />
            <span className="input-group-text">
              <IoIosSearch style={{ color: 'black', fontSize: '21px' }} />
            </span>
          </div>
        </div>

        <div className='col-md-2 mb-3'>
          <div className="input-group">
            <select
              className='form-select'
              onChange={handleYearChange}
            >
              <option value="" disabled selected>By Year</option>
              {[...Array(currentYear - 1943).keys()].map((index) => (
                <option key={index} value={currentYear - index}>
                  {currentYear - index}
                </option>
              ))}
            </select>
            <span className="input-group-text">
              <CiFilter style={{ color: 'black', fontSize: '21px' }} />
            </span>
          </div>
          {yearError && <span className='text-danger'>{yearError}</span>}
        </div>

        <div className='col-md-2 mb-3'>
          <div className="input-group">
            <select
              className='form-select'
              value={month}
              onChange={handleMonthChange}
            >
              <option value="" disabled selected>By Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <span className="input-group-text">
              <CiFilter style={{ color: 'black', fontSize: '21px' }} />
            </span>
          </div>
          {monthError && <span className='text-danger'>{monthError}</span>}
        </div>

        <div className='col-md-4 mb-3'>
          <div className="input-group">
            <select
              className='form-select'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              <option value="" disabled selected>Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="input-group-text">
              <HiSortDescending style={{ color: 'black', fontSize: '21px' }} />
            </span>
          </div>
        </div>
      </div>

      <div className='row'>
        {Array.isArray(filteredReports) && filteredReports.length > 0 ? (
          filteredReports.map((report, idx) => (
            <div key={idx} className='col-lg-2 col-md-4 col-sm-6 mb-4'>
              <a href={report.file_url} target='_blank' rel='noopener noreferrer' className='text-decoration-none'>
                <div className='card bg-dark text-white'>
                  <img src={noteImg} alt='report' className='card-img-top' />
                  <div className='card-body'>
                    <h5 className='card-title mt-3'>{report.file_name}</h5>
                    <p className='card-text'>{report.file_date}</p>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <h1 className='text-center'>No reports found</h1>
        )}
      </div>
    </div>
    </>
  );
};

export default Report;
