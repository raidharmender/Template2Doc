import React from 'react';
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/types/formTypes';
import FormSection from './FormSection';

interface AddressInfoSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const AddressInfoSection = ({ formData, handleInputChange }: AddressInfoSectionProps) => {
  return (
    <FormSection
      icon={<MapPin className="h-6 w-6 text-white" />}
      title="Address Information"
      description="Current and permanent address details"
      gradientColors="border-gradient-to-r from-green-200 to-emerald-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="currentAddress" className="text-sm font-semibold text-gray-800">
            Current Address
          </Label>
          <Textarea
            id="currentAddress"
            placeholder="Enter current address"
            value={formData.currentAddress}
            onChange={(e) => handleInputChange('currentAddress', e.target.value)}
            className="min-h-[120px] border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/80 resize-none"
            rows={4}
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="permanentAddress" className="text-sm font-semibold text-gray-800">
            Permanent Address
          </Label>
          <Textarea
            id="permanentAddress"
            placeholder="Enter permanent address"
            value={formData.permanentAddress}
            onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
            className="min-h-[120px] border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/80 resize-none"
            rows={4}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default AddressInfoSection;
