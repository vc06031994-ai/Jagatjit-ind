import React, { useEffect, useMemo, useState } from 'react';
import PdfDoc from '../../../Assets/pdf/pre-qip.pdf';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000
};

const modalStyle = {
  background: '#fff',
  borderRadius: '8px',
  maxWidth: '640px',
  width: '90%',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
};

const headerStyle = {
  margin: 0,
  marginBottom: '12px',
  fontSize: '30px',
  color: '#000',
  fontFamily: 'TradeGothicLTbold',
  fontWeight:900,
};

const labelStyle = {
  display: 'block',
  fontWeight: 600,
  marginBottom: '8px'
};

const selectStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  fontSize: '15px'
};

const infoStyle = {
  marginTop: '16px',
  color: '#6b7280'
};

const actionsStyle = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  marginTop: '20px'
};

const buttonBase = {
  padding: '10px 16px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600
};

const primaryBtn = {
  ...buttonBase,
  background: '#111',
  color: '#fff'
};

export default function CountryPopup({ open, onClose }) {
  const countries = useMemo(() => [
    { value: 'india', label: 'India' },
    { value: 'united-states', label: 'United States' },
    { value: 'italy', label: 'Italy' },
    { value: 'mali', label: 'Mali' },
    { value: 'guinea', label: 'Guinea' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'togo', label: 'Togo' },
    { value: 'drc', label: 'Democratic: Republic of Congo' },
    { value: 'angola', label: 'Angola' },
    { value: 'zambia', label: 'Zambia' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'south-africa', label: 'South Africa' },
    { value: 'mauritius', label: 'Mauritius' },
    { value: 'oman', label: 'Oman' },
    { value: 'uae', label: 'United Arab Emirates' },
    { value: 'singapore', label: 'Singapore' }
  ], []);

  const [selected, setSelected] = useState('india');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleOpenDocument = () => {
    if (selected === 'india') {
      sessionStorage.setItem('preqipCountryCompleted', 'true');
    //   window.location.href = PdfDoc
      window.open(PdfDoc, '_blank', 'noopener,noreferrer');
      // Close popup preemptively so it's not visible when user comes back
      if (typeof onClose === 'function') onClose();
    }
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="country-title">
      <div style={modalStyle}>
        <h3 id="country-title" style={headerStyle}>Country Selection</h3>
        <label style={labelStyle} htmlFor="country-select">Select Country</label>
        <select
          id="country-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={selectStyle}
        >
          {countries.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {selected === 'india' ? (
          <div style={actionsStyle}>
            <button type="button" style={primaryBtn} onClick={handleOpenDocument}>Open Document</button>
          </div>
        ) : (
          <>
            <div style={infoStyle}>Currently Not Supported</div>
            <div style={actionsStyle}>
              <button type="button" style={primaryBtn} onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


