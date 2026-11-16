import { useEffect, useState } from "react";
import axios from "axios";
import '../OurTeam/OurTeam.css';

const OurTeam = () => {

    const [management, setManagement] = useState([]);
    const [corporateMembers, setcorporateMembers] = useState([]);

    useEffect(() => {
        axios.get(`https://api.jagatjit.com/api/management `)
            .then(response => {
                setManagement(response.data.management)
                setcorporateMembers(response.data.corporateMembers)
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            }); 
    }, []); 

    const calculateExperienceInYears = (joiningDate) => {
        // Parse the joining date in ISO 8601 format
        let joinDate = new Date(joiningDate);
        if (isNaN(joinDate)) {
            throw new Error("Invalid joining date");
        }

        // Get the current date
        let currentDate = new Date();

        // Calculate the difference in years, months, and days
        let years = currentDate.getFullYear() - joinDate.getFullYear();
        let months = currentDate.getMonth() - joinDate.getMonth();
        let days = currentDate.getDate() - joinDate.getDate();

        // Adjust months and years if necessary
        if (days < 0) {
            months--;
            // Calculate the number of days in the previous month
            let previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Convert months and days to a fraction of a year
        let totalYears = years + (months / 12) + (days / 365.25);

        // Round down to the nearest whole number
        let roundedYears = Math.floor(totalYears);

        console.log('roundedYears', roundedYears);

        return `${roundedYears}+ years`;
    }
          const management2 = [
            {
                "name": "Ravi Manchanda",
                "experience": 37,
                "order": 1,
                "education": "B.tech",
                "joined_at": "1986-12-31T18:30:00.000000Z",
                "team_image": "https://d7ln3m0mi945x.cloudfront.net/364/Group-1000001791.png",
                "designation": "MD"
            },
            {
                "name": "ANIL VANJANI",
                "experience": 37,
                "order": 2,
                "education": "Chartered Accountancy (FCA), Cost Accountancy (ACMA), Company Secretary (ACS), and a Law degree (LL.B)",
                "joined_at": "2018-12-31T18:30:00.000000Z",
                "team_image": "https://d7ln3m0mi945x.cloudfront.net/365/Group-1000001790.png",
                "designation": "CEO"
            },
            {
                "name": "ANIL SINGAL",
                "experience": 24,
                "order": 3,
                "education": "B.Com, Diploma IFRS, CA",
                "joined_at": "2019-12-31T18:30:00.000000Z",
                "team_image": "https://d7ln3m0mi945x.cloudfront.net/366/Group-1000001792.png",
                "designation": "ACCOUNTS & FINANCE HEAD"
            },
            {
                "name": "NEERAJ THAKUR",
                "experience": 20,
                "order": 4,
                "education": "Bachelors in Economics & Statistics, MBA",
                "joined_at": "2022-12-31T18:30:00.000000Z",
                "team_image": "https://d7ln3m0mi945x.cloudfront.net/367/Group-1000001793.png",
                "designation": "CTO"
            },
            {
                "name": "DEVENDER GULIA",
                "experience": 25,
                "order": 5,
                "education": "BSc, MBA",
                "joined_at": "2017-12-31T18:30:00.000000Z",
                "team_image": "https://d7ln3m0mi945x.cloudfront.net/368/Group-1000001794.png",
                "designation": "DIRECTOR SALES & MARKETING"
            },
            {
                "name": "SASHI BHUSHAN SINGH",
                "experience": 17,
                "order": 6,
                "education": "B.Com Honours, MBA - HR/IR, PGHRM- XLRI",
                "joined_at": "2022-12-31T18:30:00.000000Z",
                "team_image": "https://d7ln3m0mi945x.cloudfront.net/369/Group-1000001795.png",
                "designation": "DIRECTOR HR"
            }
          ]

          const corporateMembers2 = [
            {
                "name": "NARESH KUMAR",
                "experience": 41,
                "order": 1,
                "designation": "VICE PRESIDENT - SUPPLY CHAIN",
                "joined_at": "2021-12-31T18:30:00.000000Z",
                "contact_mail": "naresh.kr@jagatjit.com"
            },
            {
                "name": "PRINCE GARG",
                "experience": 20,
                "order": 2,
                "designation": "EXECUTIVE VICE PRESIDENT - INTERNATIONAL SALES",
                "joined_at": "2019-12-31T18:30:00.000000Z",
                "contact_mail": "princegarg@jagatjit.com"
            },
            {
                "name": "AJEET SINGH",
                "experience": 20,
                "order": 3,
                "designation": "ASSOCIATE DIRECTOR - INSTITUTIONAL SALES",
                "joined_at": "2020-03-31T18:30:00.000000Z",
                "contact_mail": "ajeetsingh@jagatjit.com"
            }
          ]
    return (
        <div className="ourTeamMainDiv">
            <h1 className='reportHeading'>Our Management Team</h1>
            <div className='reportmainDiv imageMainDiv' >
                {management2.map((el, index) => (
                    <div key={index} className="teamMemberDiv">
                        <img src={el.team_image} alt="Team" className="TeamMember" />
                        <div className="teamnameDiv">
                            <h1 className="teamMemberName">{el.designation}</h1>
                            <h1 className="teamMemberName" style={{fontFamily:'Light'}}>{el.name}</h1>
                        </div>
                        <div className="hoverEffect hoverEffectMain">
                            <h1 className="hoverText designationTeam" >{el.designation}</h1>
                            <h1 className="hoverText designationTeam" style={{marginBottom: '6px' }}>{el.name}</h1>
                            <p className="hoverText hoverTextData">Total Experience: {el.experience}+ Years </p>
                            <p className="hoverText hoverTextData">Education:{el.education}</p>
                            <p className="hoverText hoverTextData">Time With JIL: {calculateExperienceInYears(el.joined_at)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h1 className='reportHeading' style={{ marginTop: '5%' }}>Corporate Members</h1>
            <div className="corporateMainDiv">
                {corporateMembers.map((er) => (
                    <div className="corporateDiv">
                        <p>{er.designation}</p>
                        <h1 style={{ marginBottom: '0%' }}>{er.name}</h1>
                        <p>Total Experience: {er.experience}+ Years</p>
                        <p>Time With JIL: {calculateExperienceInYears(er.joined_at)}</p>
                        <p>Contact: {er.contact_mail}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
};

export default OurTeam;