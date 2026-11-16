import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../OurTeam/OurTeam.css';
import { client } from '../../../api/contentful.js';

// Initialize Contentful client


// Management Team Component
const ManagementTeam = () => {
  const [managementData, setManagementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMember, setActiveMember] = useState(null); // Track active accordion item

  useEffect(() => {
    client
      .getEntries({ content_type: 'managementTeam', order: 'fields.index' }) // Sort by `index` field
      .then((response) => {
        setManagementData(response.items); // Set management data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Contentful data:', error);
        setLoading(false);
      });
  }, []);

  const handleAccordionToggle = (name) => {
    setActiveMember(activeMember === name ? null : name); // Toggle accordion
  };

  const calculateExperienceInYears = (joiningDate) => {
    const joinDate = new Date(joiningDate);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - joinDate.getFullYear();
    let months = currentDate.getMonth() - joinDate.getMonth();
    let days = currentDate.getDate() - joinDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${Math.floor(years + months / 12)}+ years`; // Rounded years
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row gy-3">
      {managementData.map((member) => (
        <div key={member.fields.name} className="col-lg-4 col-md-6 mb-4">
          <img
            src={member.fields.memberImage?.fields.file.url} // Optional chaining in case image field is missing
            alt={member.fields.name}
            className={`img-fluid mb-3 team-member-image ${activeMember === member.fields.name ? 'active' : ''}`}
          />
          <Accordion activeKey={activeMember} className="custom-accordion">
            <Accordion.Item eventKey={member.fields.name}>
              <Accordion.Header onClick={() => handleAccordionToggle(member.fields.name)}>
                <p className="global-p-3 teamdesignation">{member.fields.designation}</p>
              </Accordion.Header>
              <h5 className="accordian-title teammember">{member.fields.name}</h5>
              <Accordion.Body>
                <p className="accordian-data-p teamexp">Total Experience: {member.fields.experience} Years</p>
                <p className="accordian-data-p teamedu">Education: {member.fields.education}</p>
                <p className="accordian-data-p teamtime">Time With JIL: {calculateExperienceInYears(member.fields.joinedAt)}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

// Corporate Members Component
const CorporateMembers = () => {
  const [corporateMembersData, setCorporateMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .getEntries({ content_type: 'corporateTeam', order: 'fields.index' }) // Sort by `index` field
      .then((response) => {
        setCorporateMembersData(response.items); // Set corporate member data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Contentful data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      {corporateMembersData.map((member) => (
        <div key={member.fields.name} className="col-md-4 mb-4">
          <h5 className="global-p-2 membername">{member.fields.name}</h5>
          <p className="global-p-2 memberdesignation">{member.fields.designation}</p>
          <p className="global-p-2 memberexperience">Total Experience: {member.fields.experience} Years</p>
          <p className="global-p-2 timewith">Time With JIL: {member.fields.time}+ years</p>
          <p className="global-p-2 membercontact">Contact: {member.fields.contactMail}</p>
        </div>
      ))}
    </div>
  );
};

// Main Team Component
const Team = () => {
  return (
    <>
      <section className="manage-team">
        <div className="team-hero">
          <h1 className="heading-top">Our Management Team</h1>
        </div>
        <div className="container">
          <ManagementTeam />
        </div>
      </section>

      <section className="cor-team">
        <div className="container">
          <h2 className="g-heading-4-yellow text-center memberheading">Corporate Members</h2>
          <CorporateMembers />
        </div>
      </section>
    </>
  );
};

export default Team;
