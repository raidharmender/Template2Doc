import React from 'react';
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from '@/types/formTypes';
import FormSection from './FormSection';
import FormField from './FormField';

interface PersonalInfoSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const PersonalInfoSection = ({ formData, handleInputChange }: PersonalInfoSectionProps) => {
  return (
    <FormSection
      icon={<User className="h-6 w-6 text-white" />}
      title="Personal Information"
      description="Basic details about the employee"
      gradientColors="border-gradient-to-r from-blue-200 to-indigo-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="fullName"
          label="Full Name"
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={(value) => handleInputChange('fullName', value)}
          required
        />
        
        <FormField
          id="fatherName"
          label="Father's Name"
          placeholder="Enter father's name"
          value={formData.fatherName}
          onChange={(value) => handleInputChange('fatherName', value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="nricFin"
          label="NRIC / FIN Number"
          placeholder="Enter NRIC/FIN number"
          value={formData.nricFin}
          onChange={(value) => handleInputChange('nricFin', value)}
          required
        />
        
        <FormField
          id="dateOfBirth"
          label="Date of Birth"
          placeholder=""
          value={formData.dateOfBirth}
          onChange={(value) => handleInputChange('dateOfBirth', value)}
          type="date"
          required
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="nationality"
          label="Nationality"
          placeholder="Enter nationality"
          value={formData.nationality}
          onChange={(value) => handleInputChange('nationality', value)}
          required
        />
        
        <FormField
          id="designation"
          label="Designation / Job Title"
          placeholder="Enter job title or designation"
          value={formData.designation}
          onChange={(value) => handleInputChange('designation', value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="mobileNumber"
          label="Mobile Number"
          placeholder="Enter mobile number"
          value={formData.mobileNumber}
          onChange={(value) => handleInputChange('mobileNumber', value)}
          required
        />

        <FormField
          id="emergencyContact"
          label="Emergency Contact"
          placeholder="Enter emergency contact"
          value={formData.emergencyContact}
          onChange={(value) => handleInputChange('emergencyContact', value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="emailAddress"
          label="Email Address"
          placeholder="Enter email address"
          value={formData.emailAddress}
          onChange={(value) => handleInputChange('emailAddress', value)}
          type="email"
          required
        />

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-800">Marital Status</label>
          <Select onValueChange={(value) => handleInputChange('maritalStatus', value)}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-800 flex items-center">
            Visa Category <span className="text-red-500 ml-1">*</span>
          </label>
          <Select onValueChange={(value) => handleInputChange('visaCategory', value)}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80">
              <SelectValue placeholder="Select visa category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
              <SelectItem value="EP">Employment Pass (EP)</SelectItem>
              <SelectItem value="SP">S Pass (SP)</SelectItem>
              <SelectItem value="WP">Work Permit (WP)</SelectItem>
              <SelectItem value="Local">Local</SelectItem>
              <SelectItem value="PR">Permanent Resident (PR)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormSection>
  );
};

export default PersonalInfoSection;
