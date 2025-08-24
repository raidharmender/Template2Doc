# DOCX Template Placeholders Documentation

This document lists all available placeholders for the DOCX template based on the front-end form fields.

## Personal Information Section

| Front-end Field | Template Placeholder | Description | Required |
|----------------|---------------------|-------------|----------|
| `fullName` | `{{ fullName }}` | Employee's full name | Yes |
| `fatherName` | `{{ fatherName }}` | Father's name | Yes |
| `nricFin` | `{{ nricFin }}` | NRIC/FIN number | Yes |
| `dateOfBirth` | `{{ dateOfBirth }}` | Date of birth (YYYY-MM-DD format) | Yes |
| `nationality` | `{{ nationality }}` | Nationality | Yes |
| `country` | `{{ country }}` | Country of residence | Yes |
| `countryCode` | `{{ countryCode }}` | Country calling code (e.g., +65) | Yes |
| `mobileNumber` | `{{ mobileNumber }}` | Mobile phone number | Yes |
| `formattedPhone` | `{{ formattedPhone }}` | Complete phone number with country code | Auto-generated |
| `emailAddress` | `{{ emailAddress }}` | Email address | Yes |
| `designation` | `{{ designation }}` | Job title/designation | Yes |
| `emergencyContact` | `{{ emergencyContact }}` | Emergency contact information | No |
| `maritalStatus` | `{{ maritalStatus }}` | Marital status (single/married/divorced/widowed) | Yes |
| `visaCategory` | `{{ visaCategory }}` | Visa category (EP/SP/WP/Local/PR) | Yes |

## Address Information Section

| Front-end Field | Template Placeholder | Description | Required |
|----------------|---------------------|-------------|----------|
| `currentAddress` | `{{ currentAddress }}` | Current residential address | Yes |
| `permanentAddress` | `{{ permanentAddress }}` | Permanent address | Yes |

## Employment Details Section

| Front-end Field | Template Placeholder | Description | Required | Conditional |
|----------------|---------------------|-------------|----------|-------------|
| `underProbation` | `{{ underProbation }}` | Under probation (yes/no) | Yes | No |
| `isUnderProbation` | `{{ isUnderProbation }}` | Boolean flag for probation (true/false) | Auto-generated | No |
| `probationPeriod` | `{{ probationPeriod }}` | Probation period in months | No | Yes (if underProbation = 'yes') |
| `showProbationSection` | `{{ showProbationSection }}` | Boolean flag to show probation section | Auto-generated | No |
| `employmentType` | `{{ employmentType }}` | Employment type (permanent/contract) | Yes | No |
| `isContractEmployment` | `{{ isContractEmployment }}` | Boolean flag for contract employment | Auto-generated | No |
| `contractDuration` | `{{ contractDuration }}` | Contract duration (e.g., "2 years") | No | Yes (if employmentType = 'contract') |
| `showContractSection` | `{{ showContractSection }}` | Boolean flag to show contract section | Auto-generated | No |
| `employmentStartDate` | `{{ employmentStartDate }}` | Employment start date (YYYY-MM-DD format) | Yes | No |

## Compensation Section

| Front-end Field | Template Placeholder | Description | Required | Conditional |
|----------------|---------------------|-------------|----------|-------------|
| `monthlySalary` | `{{ monthlySalary }}` | Monthly salary amount | Yes | No |
| `salaryCurrency` | `{{ salaryCurrency }}` | Salary currency (SGD/USD/EUR/MYR/INR) | Yes | No |
| `formattedSalary` | `{{ formattedSalary }}` | Salary with currency (e.g., "SGD 8000") | Auto-generated | No |
| `paidLeaveEntitlement` | `{{ paidLeaveEntitlement }}` | Paid leave days per year | Yes | No |
| `medicalLeaveEntitlement` | `{{ medicalLeaveEntitlement }}` | Medical leave days per year | Yes | No |
| `noticePeriod` | `{{ noticePeriod }}` | Notice period for termination | Yes | No |
| `offerValidityDate` | `{{ offerValidityDate }}` | Offer validity date (YYYY-MM-DD format) | Yes | No |
| `lockInPenalty` | `{{ lockInPenalty }}` | Lock-in period penalty (yes/no) | Yes | No |
| `hasLockInPenalty` | `{{ hasLockInPenalty }}` | Boolean flag for lock-in penalty | Auto-generated | No |
| `lockInPenaltyMonths` | `{{ lockInPenaltyMonths }}` | Number of months for lock-in | No | Yes (if lockInPenalty = 'yes') |
| `showLockInSection` | `{{ showLockInSection }}` | Boolean flag to show lock-in section | Auto-generated | No |
| `delayedStartPenalty` | `{{ delayedStartPenalty }}` | Penalty for delayed start (yes/no) | Yes | No |
| `hasDelayedStartPenalty` | `{{ hasDelayedStartPenalty }}` | Boolean flag for delayed start penalty | Auto-generated | No |
| `delayedStartPenaltyAmount` | `{{ delayedStartPenaltyAmount }}` | Penalty amount or description | No | Yes (if delayedStartPenalty = 'yes') |
| `showDelayedStartSection` | `{{ showDelayedStartSection }}` | Boolean flag to show delayed start section | Auto-generated | No |

## Conditional Section Logic

### Probation Section
- **Show when**: `{{ isUnderProbation }}` is true OR `{{ showProbationSection }}` is true
- **Hide when**: `{{ underProbation }}` is 'no' or empty

### Contract Duration Section
- **Show when**: `{{ isContractEmployment }}` is true OR `{{ showContractSection }}` is true
- **Hide when**: `{{ employmentType }}` is 'permanent' or empty

### Lock-in Penalty Section
- **Show when**: `{{ hasLockInPenalty }}` is true OR `{{ showLockInSection }}` is true
- **Hide when**: `{{ lockInPenalty }}` is 'no' or empty

### Delayed Start Penalty Section
- **Show when**: `{{ hasDelayedStartPenalty }}` is true OR `{{ showDelayedStartSection }}` is true
- **Hide when**: `{{ delayedStartPenalty }}` is 'no' or empty

## Template Usage Examples

### Basic Personal Information
```
Dear {{ fullName }},

We are pleased to offer you the position of {{ designation }} at our company.

Personal Details:
- Name: {{ fullName }}
- NRIC/FIN: {{ nricFin }}
- Date of Birth: {{ dateOfBirth }}
- Nationality: {{ nationality }}
- Contact: {{ formattedPhone }}
- Email: {{ emailAddress }}
```

### Conditional Probation Section
```
{% if isUnderProbation %}
You will be under probation for {{ probationPeriod }} months from your start date.
{% endif %}
```

### Conditional Contract Duration
```
{% if isContractEmployment %}
This is a contract position for {{ contractDuration }}.
{% else %}
This is a permanent position.
{% endif %}
```

### Conditional Penalty Sections
```
{% if hasLockInPenalty %}
Lock-in Period: {{ lockInPenaltyMonths }} months
{% endif %}

{% if hasDelayedStartPenalty %}
Delayed Start Penalty: {{ delayedStartPenaltyAmount }}
{% endif %}
```

## Notes

1. **Auto-generated fields**: These are computed by the backend and don't need to be provided in the front-end form data.

2. **Boolean flags**: Use these for conditional rendering in the template (e.g., `{% if isUnderProbation %}`).

3. **Formatted fields**: These combine multiple fields for better presentation (e.g., `formattedSalary` combines currency and amount).

4. **Conditional sections**: Always check both the boolean flag and the show flag for maximum compatibility.

5. **Date formatting**: All dates are in YYYY-MM-DD format. You may need to format them in the template for better presentation. 