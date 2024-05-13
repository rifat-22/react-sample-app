// components/Topbar.js
import React from 'react';

function Topbar({ showBackButton, onBack }) {
  return (
    <div className="topbar">
      {showBackButton && (
        <button onClick={onBack} className="back-button">
          Back
        </button>
      )}
      <h1 style={{ flex: 1, textAlign: 'center' }}>EKYC Verification</h1>
    </div>
  );
}

export default Topbar;
