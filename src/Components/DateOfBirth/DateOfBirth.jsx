import React, { useEffect, useRef, useState } from 'react';
import '../DateOfBirth/DateOfBirth.css';
import logo from '../../Assets/DOB/age-logo.png';
import { Link, useNavigate } from 'react-router-dom';

function DateOfBirth() {
    let dates = {};
    try {
        const data = localStorage.getItem("date");
        if (data) {
            dates = JSON.parse(data);
        }
    } catch (error) {
        console.error("Error parsing data from localStorage:", error);
    }

    const [day, setDay] = useState(dates?.day || '');
    const [month, setMonth] = useState(dates?.month || '');
    const [year, setYear] = useState(dates?.year || '');
    const [yearError, setYearError] = useState('');
    const [remember, setRemember] = useState(dates?.remember || false);
    const dayInputRef = useRef(null);
    const monthInputRef = useRef(null);
    const yearInputRef = useRef(null);
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (day.length === 2) {
            monthInputRef.current.focus();
        }
        if (month.length === 2) {
            yearInputRef.current.focus();
        }
    }, [day, month]);

    useEffect(() => {
        if (day.length === 2 && month.length === 2 && year.length === 4) {
            const birthDate = new Date(`${year}-${month}-${day}`);
            const age = currentYear - birthDate.getFullYear();

            if (
                age >= 21 &&
                birthDate <= new Date() &&
                1900 <= parseInt(year) &&
                parseInt(year) <= currentYear
            ) {
                setYearError('');

                // Save data to localStorage without checking remember
                const data = {
                    day,
                    month,
                    year,
                    expires: Date.now() + (1 * 24 * 60 * 60 * 1000) // expires in 1 day
                };
                localStorage.setItem("date", JSON.stringify(data));

                // Redirect to home
                navigate('/home');
            } else {
                setYearError('Sorry, you must be at least 21 years old to proceed.');
            }
        }
    }, [day, month, year, currentYear, navigate]);

    const handleRememberChange = () => {
        setRemember((prev) => !prev);
    };

    return (
        <div className='loginMainDivDob'>
            <div className="container">
                <div className='loginDiv'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
                <div className='dobheadingDiv'>
                    <h1 className='dobheading'>To Access our websites you must be of legal age for consuming alcohol.</h1>
                </div>
                {yearError && (
                    <div style={{ color: 'red' }}>
                        {yearError}
                    </div>
                )}
                <div>
                    <h1 className='dobparagraph'>Your Date of Birth:</h1>
                    <div className='dobinputFields'>
                        <input
                            type='number'
                            ref={dayInputRef}
                            id='day'
                            required
                            autoComplete='off'
                            placeholder='DD'
                            min="1"
                            max="31"
                            value={day}
                            className='dateDiv'
                            onChange={(e) => setDay(e.target.value.slice(0, 2))}
                        />
                        <span className='age-sless'>/</span>
                        <input
                            type='number'
                            ref={monthInputRef}
                            id='month'
                            required
                            autoComplete='off'
                            placeholder='MM'
                            min="1"
                            max="12"
                            value={month}
                            className='dateDiv'
                            onChange={(e) => setMonth(e.target.value.slice(0, 2))}
                        />
                        <span className='age-sless'>/</span>
                        <input
                            type='number'
                            ref={yearInputRef}
                            id='year'
                            required
                            autoComplete='off'
                            placeholder='YYYY'
                            min="1900"
                            max={currentYear}
                            value={year}
                            className='dateDiv'
                            onChange={(e) => setYear(e.target.value.slice(0, 4))}
                        />
                    </div>

                    <div className='remeberBoxDiv'>
                        <input
                            type='checkbox'
                            className='checkbox'
                            id='checkboxId'
                            checked={remember}
                            onChange={handleRememberChange}
                        />
                        <label htmlFor='checkboxId' className='dobRemember'>
                            Remember Me
                        </label>
                    </div>
                </div>
                <div className='dobRights'>
                    <p className='firstParagraphdobFooterRights'>All rights reserved. All other trademarks and trade names are properties of their respective owners.</p>
                    <p className='secondParagraphdobFooterRights'>TO FIND OUT MORE ABOUT RESPONSIBLE CONSUMPTION. VISIT <Link to='https://www.responsibility.org/' className='ancherTag'>RESPONSIBILITY.ORG</Link></p>
                    <p className='thirdParagraphdobFooterRights'>Please do not share or forward with anyone under the legal drinking age.</p>
                </div>
            </div>
        </div>
    );
}

export default DateOfBirth;
