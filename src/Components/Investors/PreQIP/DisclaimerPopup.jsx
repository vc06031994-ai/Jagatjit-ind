import React, { useEffect } from 'react';

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
  zIndex: 9999
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
  fontWeight:900,
  fontFamily: 'TradeGothicLTbold',
  
};

const contentStyle = {
  color: '#333',
  lineHeight: 1.6,
  marginBottom: '20px',
  fontFamily: 'TradeGothicLTbold',
};

const actionsStyle = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center'
};

const buttonBase = {
  padding: '10px 16px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600
};

const acceptBtn = {
  ...buttonBase,
  background: '#111',
  color: '#fff'
};

const rejectBtn = {
  ...buttonBase,
  background: '#e5e7eb',
  color: '#111'
};

export default function DisclaimerPopup({ open, onAccept, onReject }) {
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

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div style={modalStyle}>
        <h2 id="disclaimer-title" style={headerStyle}>Disclaimer</h2>
        <div style={contentStyle}>
          <p>
            The information presented on this page is provided for general informational
            purposes only and may be subject to change without prior notice. It should not be
            construed as investment advice or an offer to buy or sell any securities.
          </p>
          <p>
            By selecting Accept, you acknowledge that you have read and understood this
            disclaimer and agree to proceed. 
          </p>
        </div>
        <div style={actionsStyle}>
          <button type="button" style={rejectBtn} onClick={onReject}>Reject</button>
          <button type="button" style={acceptBtn} onClick={onAccept}>Accept</button>
        </div>
      </div>
    </div>
  );
}


