// Liveness.js
import React from 'react';

function Liveness({ onNext }) {
  return (
    <div>
      <h2>Liveness Check</h2>
      <button onClick={onNext}>Complete Liveness Check</button>
    </div>
  );
}

export default Liveness;
