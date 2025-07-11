
import React from 'react';
import { Calendar, Clock } from "lucide-react";
import FormSection from './FormSection';
import FormField from './FormField';
import { FormData } from '@/types/formTypes';

interface OfferValiditySectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const OfferValiditySection = ({ formData, handleInputChange }: OfferValiditySectionProps) => {
  return (
    <FormSection
      icon={<Clock className="h-6 w-6 text-white" />}
      title="Offer Validity"
      description="Specify the validity period for this offer letter"
      gradientColors="border-gradient-to-r from-purple-500 to-pink-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="employmentStartDate"
          label="Employment Start Date"
          placeholder="YYYY-MM-DD"
          value={formData.employmentStartDate}
          onChange={(value) => handleInputChange('employmentStartDate', value)}
          type="date"
          required
        />
        <FormField
          id="offerValidityDate"
          label="Offer Validity Date"
          placeholder="YYYY-MM-DD"
          value={formData.offerValidityDate}
          onChange={(value) => handleInputChange('offerValidityDate', value)}
          type="date"
          required
        />
      </div>
    </FormSection>
  );
};

export default OfferValiditySection;
