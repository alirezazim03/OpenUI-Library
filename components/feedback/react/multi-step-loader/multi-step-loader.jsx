import React, { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';

const MultiStepLoader = ({ totalSteps = 4 }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => prev === totalSteps ? 1 : prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [totalSteps]);

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        const isUpcoming = step > currentStep;

        let circleClass = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2 ";
        let lineClass = "flex-1 h-0.5 bg-gray-300 transition-colors duration-300 ";

        if (isCompleted) {
          circleClass += "bg-indigo-400 text-white border-indigo-400";
          return (
            <React.Fragment key={step}>
              <div className={circleClass}>
                <FiCheck size={16} />
              </div>
              {index < totalSteps - 1 && (
                <div
                  className="flex-1 h-0.5 bg-indigo-400 transition-transform duration-1000 origin-left"
                  style={{ transform: 'scaleX(1)' }}
                ></div>
              )}
            </React.Fragment>
          );
        } else if (isActive) {
          circleClass += "bg-indigo-500 text-white border-indigo-500 animate-pulse";
          return (
            <React.Fragment key={step}>
              <div className={circleClass}>
                {step}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className="flex-1 h-0.5 bg-indigo-400 transition-transform duration-1000 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                ></div>
              )}
            </React.Fragment>
          );
        } else {
          circleClass += "bg-white text-gray-500 border-gray-300";
          return (
            <React.Fragment key={step}>
              <div className={circleClass}>
                {step}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className="flex-1 h-0.5 bg-indigo-400 transition-transform duration-1000 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                ></div>
              )}
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

MultiStepLoader.defaultProps = {
  totalSteps: 4
};

export default MultiStepLoader;