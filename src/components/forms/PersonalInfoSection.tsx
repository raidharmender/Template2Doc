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
              type="text"
              className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 rounded-lg px-3 flex-1"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={e => {
                if (e.target.value === '' || validatePhone(e.target.value)) {
                  handleInputChange('mobileNumber', e.target.value);
                }
              }}
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
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-800">Marital Status</label>
        <Select onValueChange={(value) => handleInputChange('maritalStatus', value)} value={formData.maritalStatus}>
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
    </FormSection>
  );
};

export default PersonalInfoSection;
