import React from 'react';
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from '@/types/formTypes';
import FormSection from './FormSection';
import FormField from './FormField';

const countries = [
  { name: 'Singapore', code: '+65' },
  { name: 'India', code: '+91' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Australia', code: '+61' },
  // Add more as needed
];

interface PersonalInfoSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const PersonalInfoSection = ({ formData, handleInputChange }: PersonalInfoSectionProps) => {
  // Phone validation: only digits, length 8-15
  const validatePhone = (value: string) => /^\d{8,15}$/.test(value);
  // Date validation: not in the future
  const validateDate = (value: string) => {
    if (!value) return true;
    const inputDate = new Date(value);
    const now = new Date();
    return inputDate <= now;
  };

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
          onChange={(value) => {
            if (validateDate(value)) handleInputChange('dateOfBirth', value);
          }}
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
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-800">Country</label>
          <Select onValueChange={(value) => handleInputChange('country', value)} value={formData.country}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
              {countries.map((c) => (
                <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-800 flex items-center">
            Visa Category <span className="text-red-500 ml-1">*</span>
          </label>
          <Select onValueChange={(value) => handleInputChange('visaCategory', value)} value={formData.visaCategory}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-800">Mobile Number</label>
          <div className="flex gap-2">
            <Select onValueChange={(value) => handleInputChange('countryCode', value)} value={formData.countryCode}>
              <SelectTrigger className="h-12 w-28 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="tel"
              pattern="[0-9]{8,15}"
              inputMode="numeric"
              className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 rounded-lg px-3 flex-1"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={e => handleInputChange('mobileNumber', e.target.value)}
              required
            />
          </div>
        </div>
        <FormField
          id="emailAddress"
          label="Email Address"
          placeholder="Enter email address"
          value={formData.emailAddress}
          onChange={(value) => handleInputChange('emailAddress', value)}
          type="email"
          required
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          id="designation"
          label="Designation / Job Title"
          placeholder="Enter job title or designation"
          value={formData.designation}
          onChange={(value) => handleInputChange('designation', value)}
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
      <div className="space-y-3 lg:w-1/2">
        <label className="text-sm font-semibold text-gray-800">Marital Status</label>
        <Select onValueChange={(value) => handleInputChange('maritalStatus', value)} value={formData.maritalStatus}>
          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 w-full max-w-xs">
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
    </FormSection>
  );
};

export default PersonalInfoSection;
