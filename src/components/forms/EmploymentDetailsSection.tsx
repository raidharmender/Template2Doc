
import React from 'react';
import { Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from '@/types/formTypes';
import FormSection from './FormSection';
import FormField from './FormField';

interface EmploymentDetailsSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const EmploymentDetailsSection = ({ formData, handleInputChange }: EmploymentDetailsSectionProps) => {
  return (
    <FormSection
      icon={<Briefcase className="h-6 w-6 text-white" />}
      title="Employment Details"
      description="Job terms and conditions"
      gradientColors="border-gradient-to-r from-purple-200 to-pink-200"
    >
      <div className="space-y-8">
        {/* First Row: Probation and Employment Type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-800 flex items-center">
              Under Probation <span className="text-red-500 ml-1">*</span>
            </Label>
            <RadioGroup 
              value={formData.underProbation} 
              onValueChange={(value) => handleInputChange('underProbation', value)}
              className="flex space-x-8"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="yes" id="probation-yes" className="w-5 h-5 border-2" />
                <Label htmlFor="probation-yes" className="text-gray-700 font-medium cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no" id="probation-no" className="w-5 h-5 border-2" />
                <Label htmlFor="probation-no" className="text-gray-700 font-medium cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-800 flex items-center">
              Employment Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <RadioGroup 
              value={formData.employmentType} 
              onValueChange={(value) => handleInputChange('employmentType', value)}
              className="flex space-x-8"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="permanent" id="employment-permanent" className="w-5 h-5 border-2" />
                <Label htmlFor="employment-permanent" className="text-gray-700 font-medium cursor-pointer">Permanent</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="contract" id="employment-contract" className="w-5 h-5 border-2" />
                <Label htmlFor="employment-contract" className="text-gray-700 font-medium cursor-pointer">Contract</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Second Row: Conditional Fields + Employment Start Date */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {formData.underProbation === 'yes' && (
            <FormField
              id="probationPeriod"
              label="Probation Period (months)"
              placeholder="Enter probation period in months"
              value={formData.probationPeriod}
              onChange={(value) => handleInputChange('probationPeriod', value)}
              type="number"
              required
              className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/80"
            />
          )}

          {formData.employmentType === 'contract' && (
            <FormField
              id="contractDuration"
              label="Contract Duration"
              placeholder="e.g., 2 years, 18 months"
              value={formData.contractDuration}
              onChange={(value) => handleInputChange('contractDuration', value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/80"
            />
          )}

          <FormField
            id="employmentStartDate"
            label="Employment Start Date"
            placeholder=""
            value={formData.employmentStartDate}
            onChange={(value) => handleInputChange('employmentStartDate', value)}
            type="date"
            required
            className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/80"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default EmploymentDetailsSection;
