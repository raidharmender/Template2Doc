
import React from 'react';

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  gradientColors: string;
}

const FormSection = ({ icon, title, description, children, gradientColors }: FormSectionProps) => {
  return (
    <div className="space-y-8">
      <div className={`flex items-center space-x-4 pb-6 border-b-2 ${gradientColors}`}>
        <div className={`p-3 bg-gradient-to-r ${gradientColors.replace('border-gradient-to-r from-', 'from-').replace(' to-', ' to-')} rounded-xl shadow-lg`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default FormSection;
