import React from 'react';

const StepProgress = ({ currentStep }) => {
  const steps = [
    { id: 'upload', label: 'Upload' },
    { id: 'themes', label: 'Themes' },
    { id: 'pulse', label: 'Pulse' },
    { id: 'email', label: 'Email' }
  ];

  const getStepIndex = (stepId) => {
    const stepMap = { idle: 0, themed: 1, pulsed: 2, drafted: 3 };
    return stepMap[stepId] || 0;
  };

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="bg-background-primary border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    {index > 0 && (
                      <div 
                        className={`w-8 h-0.5 mr-4 ${
                          isCompleted ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    )}
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                        ${isCompleted 
                          ? 'bg-accent text-white' 
                          : isCurrent 
                            ? 'bg-background-primary border-2 border-accent text-accent dark:shadow-[0_0_0_4px_rgba(129,140,248,0.15),0_0_20px_rgba(129,140,248,0.2)]'
                            : 'bg-background-tertiary text-text-tertiary border-2 border-border'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                  <span 
                    className={`
                      mt-2 text-xs font-medium whitespace-nowrap
                      ${isCurrent 
                        ? 'text-accent' 
                        : isCompleted 
                          ? 'text-text-primary' 
                          : 'text-text-tertiary'
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
