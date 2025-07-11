
import React from 'react';
import { CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-6">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              currentStep >= step 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-110' 
                : 'bg-white text-gray-400 border-2 border-gray-200'
            }`}>
              {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
              {currentStep === step && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
              )}
            </div>
            {step < 3 && (
              <div className={`w-20 h-1 mx-4 rounded-full transition-all duration-300 ${
                currentStep > step ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
