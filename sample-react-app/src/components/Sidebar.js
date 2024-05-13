// Sidebar.js
import React from 'react';

function Sidebar({ currentStep, setCurrentStep, completedSteps }) {
  const changeStep = (step) => {
    if (step <= currentStep || completedSteps[step]) {
      setCurrentStep(step);
    } else {
      alert('Please complete the current step before moving on.');
    }
  };

  return (
    <div className="sidebar">
      {completedSteps.map((completed, index) => (
        <button
          key={index}
          onClick={() => changeStep(index)}
          className={`sidebar-item ${index === currentStep ? 'active' : ''}`}
          style={{ opacity: completed || index <= currentStep ? 1 : 0.5 }} // Lower opacity for not yet available steps
        >
          Step {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
