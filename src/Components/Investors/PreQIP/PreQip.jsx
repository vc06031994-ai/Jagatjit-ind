import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisclaimerPopup from './DisclaimerPopup';
import CountryPopup from './CountryPopup';


 const PreQip = () => {
  const [open, setOpen] = useState(true);
  const [showCountry, setShowCountry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   const accepted = sessionStorage.getItem('preqipDisclaimerAccepted') === 'true';
   const countryCompleted = sessionStorage.getItem('preqipCountryCompleted') === 'true';
   setOpen(!accepted);
   setShowCountry(accepted && !countryCompleted);
  }, []);

  const handleAccept = () => {
   sessionStorage.setItem('preqipDisclaimerAccepted', 'true');
   setOpen(false);
   setShowCountry(true);
  };

  const handleReject = () => {
   setOpen(false);
  };

  return (
    <div className="food-header text-center py-5 food-hero our-process">
    <h1  className="heading-top">Pre Qip</h1>
    <DisclaimerPopup open={open} onAccept={handleAccept} onReject={handleReject} />
    <CountryPopup open={showCountry} onClose={() => setShowCountry(false)} />
  </div>
  );
};

export default PreQip;
