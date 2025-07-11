
import React from 'react';
import { DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from '@/types/formTypes';
import FormSection from './FormSection';
import FormField from './FormField';

interface CompensationSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const CompensationSection = ({ formData, handleInputChange }: CompensationSectionProps) => {
  // Set default value of 12 months when "yes" is selected
  const handleLockInPenaltyChange = (value: string) => {
    handleInputChange('lockInPenalty', value);
    if (value === 'yes' && !formData.lockInPenaltyMonths) {
      handleInputChange('lockInPenaltyMonths', '12');
    }
  };

  return (
    <FormSection
      icon={<DollarSign className="h-6 w-6 text-white" />}
      title="Compensation & Benefits"
      description="Salary and benefit details"
      gradientColors="border-gradient-to-r from-amber-200 to-orange-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Label htmlFor="monthlySalary" className="text-sm font-semibold text-gray-800 flex items-center">
            Monthly Salary <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="flex space-x-3">
            <Select onValueChange={(value) => handleInputChange('salaryCurrency', value)} defaultValue="SGD">
              <SelectTrigger className="w-24 h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
                <SelectItem value="SGD">SGD</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="MYR">MYR</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="monthlySalary"
              type="number"
              placeholder="Enter monthly salary"
              value={formData.monthlySalary}
              onChange={(e) => handleInputChange('monthlySalary', e.target.value)}
              className="flex-1 h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
            />
          </div>
        </div>

        <FormField
          id="paidLeaveEntitlement"
          label="Paid Leave (days/year)"
          placeholder="Enter paid leave days"
          value={formData.paidLeaveEntitlement}
          onChange={(value) => handleInputChange('paidLeaveEntitlement', value)}
          type="number"
          className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
        />

        <FormField
          id="medicalLeaveEntitlement"
          label="Medical Leave (days/year)"
          placeholder="Enter medical leave days"
          value={formData.medicalLeaveEntitlement}
          onChange={(value) => handleInputChange('medicalLeaveEntitlement', value)}
          type="number"
          className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="noticePeriod"
          label="Notice Period for Termination"
          placeholder="e.g., 1 month, 2 weeks"
          value={formData.noticePeriod}
          onChange={(value) => handleInputChange('noticePeriod', value)}
          className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
        />

        <FormField
          id="offerValidityDate"
          label="Offer Validity Date"
          placeholder="YYYY-MM-DD"
          value={formData.offerValidityDate}
          onChange={(value) => handleInputChange('offerValidityDate', value)}
          type="date"
          required
          className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-gray-800 flex items-center">
            Lock-in Period Penalty
          </Label>
          <RadioGroup 
            value={formData.lockInPenalty} 
            onValueChange={handleLockInPenaltyChange}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="lockin-yes" className="w-5 h-5 border-2" />
              <Label htmlFor="lockin-yes" className="text-gray-700 font-medium cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="lockin-no" className="w-5 h-5 border-2" />
              <Label htmlFor="lockin-no" className="text-gray-700 font-medium cursor-pointer">No</Label>
            </div>
          </RadioGroup>
          
          {formData.lockInPenalty === 'yes' && (
            <div className="mt-4">
              <Label htmlFor="lockInPenaltyMonths" className="text-sm font-semibold text-gray-800 flex items-center">
                Number of Months <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select onValueChange={(value) => handleInputChange('lockInPenaltyMonths', value)} value={formData.lockInPenaltyMonths || '12'}>
                <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80 mt-2">
                  <SelectValue placeholder="Select months" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="9">9 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-semibold text-gray-800 flex items-center">
            Penalty for Delayed Start
          </Label>
          <RadioGroup 
            value={formData.delayedStartPenalty} 
            onValueChange={(value) => handleInputChange('delayedStartPenalty', value)}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="delayed-yes" className="w-5 h-5 border-2" />
              <Label htmlFor="delayed-yes" className="text-gray-700 font-medium cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="delayed-no" className="w-5 h-5 border-2" />
              <Label htmlFor="delayed-no" className="text-gray-700 font-medium cursor-pointer">No</Label>
            </div>
          </RadioGroup>
          
          {formData.delayedStartPenalty === 'yes' && (
            <div className="mt-4">
              <Label htmlFor="delayedStartPenaltyAmount" className="text-sm font-semibold text-gray-800 flex items-center">
                Penalty Amount <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="delayedStartPenaltyAmount"
                type="text"
                placeholder="Enter penalty amount or description"
                value={formData.delayedStartPenaltyAmount || ''}
                onChange={(e) => handleInputChange('delayedStartPenaltyAmount', e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80 mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
};

export default CompensationSection;
