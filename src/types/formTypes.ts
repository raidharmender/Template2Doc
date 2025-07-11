
export interface FormData {
  fullName: string;
  fatherName: string;
  nricFin: string;
  dateOfBirth: string;
  nationality: string;
  mobileNumber: string;
  emergencyContact: string;
  currentAddress: string;
  permanentAddress: string;
  emailAddress: string;
  maritalStatus: string;
  visaCategory: string;
  designation: string;
  underProbation: string;
  probationPeriod: string;
  employmentType: string;
  contractDuration: string;
  monthlySalary: string;
  salaryCurrency: string;
  paidLeaveEntitlement: string;
  medicalLeaveEntitlement: string;
  noticePeriod: string;
  lockInPenalty: string;
  lockInPenaltyMonths: string;
  employmentStartDate: string;
  delayedStartPenalty: string;
  delayedStartPenaltyAmount: string;
  offerValidityDate: string;
}

export const initialFormData: FormData = {
  fullName: '',
  fatherName: '',
  nricFin: '',
  dateOfBirth: '',
  nationality: '',
  mobileNumber: '',
  emergencyContact: '',
  currentAddress: '',
  permanentAddress: '',
  emailAddress: '',
  maritalStatus: '',
  visaCategory: '',
  designation: '',
  underProbation: '',
  probationPeriod: '',
  employmentType: '',
  contractDuration: '',
  monthlySalary: '',
  salaryCurrency: 'SGD',
  paidLeaveEntitlement: '',
  medicalLeaveEntitlement: '',
  noticePeriod: '',
  lockInPenalty: '',
  lockInPenaltyMonths: '',
  employmentStartDate: '',
  delayedStartPenalty: '',
  delayedStartPenaltyAmount: '',
  offerValidityDate: ''
};
