import './App.css';

// App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Array(totalSteps).fill(false));

  const handleSubmit = () => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[currentStep + 1] = true;  // Unlock the next step
    setCompletedSteps(newCompletedSteps);
    setCurrentStep(currentStep + 1);  // Move to the next step
  };

  return (
    <div className="app">
      <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} completedSteps={completedSteps} />
      <div className="content">
        <h1>Content for Step {currentStep + 1}</h1>
        {currentStep < totalSteps - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default App;



