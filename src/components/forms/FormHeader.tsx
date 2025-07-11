
import React from 'react';
import { FileText } from "lucide-react";

const FormHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Offer Letter Generator</h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Create professional offer letters with our intuitive form. 
        Fill in the details below and generate a personalized PDF document in minutes.
      </p>
    </div>
  );
};

export default FormHeader;
