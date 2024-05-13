// App.js
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import LandingPage from './components/LandingPage';
import LivenessDetection from './components/Liveness';

function App() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Array(totalSteps).fill(false));
  const [view, setView] = useState('landing'); // 'landing' or 'main'
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // State to control submit button

  const handleSubmit = () => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[currentStep + 1] = true;
    setCompletedSteps(newCompletedSteps);
    setCurrentStep(currentStep + 1);
  };

  const handleContinue = () => {
    setView('main');
  };

  const handleBack = () => {
    setView('landing');
  };

  const onSmileDetected = () => {
    setIsSubmitEnabled(true); // Enable submit button when smile is detected
  };

  return (
    <div className="app">
      <Topbar showBackButton={view === 'main'} onBack={handleBack} />
      {view === 'landing' ? (
        <LandingPage onContinue={handleContinue} />
      ) : (
        <div className="main-content">
          <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} completedSteps={completedSteps} />
          <div className="content">
            <h1>Content for Step {currentStep + 1}</h1>
            {currentStep === 0 && <LivenessDetection onSmileDetected={onSmileDetected} />}
            {currentStep < totalSteps - 1 && (
              <button onClick={handleSubmit} disabled={!isSubmitEnabled} className="nice-submit">Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
