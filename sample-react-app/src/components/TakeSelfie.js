// TakeSelfie.js
import React from 'react';

function TakeSelfie({ onNext }) {
  return (
    <div>
      <h2>Selfie Check</h2>
      <button onClick={onNext}>Complete Liveness Check</button>
    </div>
  );
}

export default TakeSelfie;
