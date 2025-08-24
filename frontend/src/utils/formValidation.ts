
import { FormData } from '@/types/formTypes';

export const validateForm = (formData: FormData, toast: any) => {
  const requiredFields = [
    'fullName', 'fatherName', 'nricFin', 'dateOfBirth', 
    'nationality', 'mobileNumber', 'emailAddress', 'visaCategory',
    'designation', 'underProbation', 'employmentType', 'monthlySalary', 
    'employmentStartDate', 'offerValidityDate'
  ];
  
  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]) {
      toast({
        title: "Missing Information",
        description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
        variant: "destructive"
      });
      return false;
    }
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.emailAddress)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email address",
      variant: "destructive"
    });
    return false;
  }

  // Conditional validation for probation period
  if (formData.underProbation === 'yes' && !formData.probationPeriod) {
    toast({
      title: "Missing Information",
      description: "Please specify the probation period in months",
      variant: "destructive"
    });
    return false;
  }

  // Conditional validation for contract duration
  if (formData.employmentType === 'contract' && !formData.contractDuration) {
    toast({
      title: "Missing Information",
      description: "Please specify the contract duration",
      variant: "destructive"
    });
    return false;
  }

  // Conditional validation for lock-in penalty months
  if (formData.lockInPenalty === 'yes' && !formData.lockInPenaltyMonths) {
    toast({
      title: "Missing Information",
      description: "Please specify the number of months for lock-in penalty",
      variant: "destructive"
    });
    return false;
  }

  // Conditional validation for delayed start penalty amount
  if (formData.delayedStartPenalty === 'yes' && !formData.delayedStartPenaltyAmount) {
    toast({
      title: "Missing Information",
      description: "Please specify the penalty amount for delayed start",
      variant: "destructive"
    });
    return false;
  }
  
  return true;
};
