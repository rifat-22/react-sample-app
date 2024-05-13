// components/LandingPage.js
import React, { useState } from 'react';

function LandingPage({ onContinue }) {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <div className="landing-page">
      <div className="card">
        <img src="/public/liveness.gif" alt="Welcome" />
        {/* <p>Welcome to The Bio App</p> */}
      </div>
      <div className="card">
        <img src="path_to_image" alt="Privacy" />
        <p>Your privacy is our most important priority...</p>
      </div>
      <div className="card liveness-detection">
        <h1>Active Face Liveness Detection</h1>
        <p>Active Face Liveness Detection uses live camera feed and distinguishes between a live image and a 2D printed, 3D printed or a digital image of a user’s face.</p>
        <button onClick={onContinue} className="start-camera">Start Camera</button>
      </div>
      <div className="card">
        <img src="path_to_image" alt="Enrollment" />
        <p>Enroll only one application at a time...</p>
      </div>
      <div className="card terms">
        <h2>Terms & Conditions</h2>
        <p>To use the Mobile Enrollment service you must agree to the Terms & Conditions</p>
        <div>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={handleCheckboxChange}
            id="termsCheckbox"
          />
          <label htmlFor="termsCheckbox">I have read and accept both Privacy Policy and the Terms & Conditions</label>
        </div>
      </div>
      <button onClick={onContinue} disabled={!agreeTerms} className="start-button">
        Start Self Enrollment
      </button>
    </div>
  );
}

export default LandingPage;
