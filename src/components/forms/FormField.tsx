
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

const FormField = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = "text", 
  required = false,
  className = "h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80"
}: FormFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-semibold text-gray-800 flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
};

export default FormField;
