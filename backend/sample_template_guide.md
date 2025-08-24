# Sample DOCX Template Structure

This guide shows how to structure your DOCX template using the available placeholders and conditional sections.

## Template Structure

### 1. Header Section
```
COMPANY NAME
OFFER LETTER

Date: [Current Date]

To: {{ fullName }}
    {{ currentAddress }}

Dear {{ fullName }},

We are pleased to offer you the position of {{ designation }} at our company.
```

### 2. Personal Information Section
```
PERSONAL DETAILS:
- Full Name: {{ fullName }}
- Father's Name: {{ fatherName }}
- NRIC/FIN Number: {{ nricFin }}
- Date of Birth: {{ dateOfBirth }}
- Nationality: {{ nationality }}
- Country: {{ country }}
- Contact Number: {{ formattedPhone }}
- Email Address: {{ emailAddress }}
- Marital Status: {{ maritalStatus }}
- Visa Category: {{ visaCategory }}
{% if emergencyContact %}
- Emergency Contact: {{ emergencyContact }}
{% endif %}
```

### 3. Address Information Section
```
ADDRESS DETAILS:
Current Address:
{{ currentAddress }}

Permanent Address:
{{ permanentAddress }}
```

### 4. Employment Details Section
```
EMPLOYMENT DETAILS:
- Position: {{ designation }}
- Employment Type: {{ employmentType }}
- Start Date: {{ employmentStartDate }}

{% if isUnderProbation %}
- Probation Period: {{ probationPeriod }} months
{% endif %}

{% if isContractEmployment %}
- Contract Duration: {{ contractDuration }}
{% endif %}
```

### 5. Compensation Section
```
COMPENSATION & BENEFITS:
- Monthly Salary: {{ formattedSalary }}
- Paid Leave: {{ paidLeaveEntitlement }} days per year
- Medical Leave: {{ medicalLeaveEntitlement }} days per year
- Notice Period: {{ noticePeriod }}

{% if hasLockInPenalty %}
- Lock-in Period: {{ lockInPenaltyMonths }} months
{% endif %}

{% if hasDelayedStartPenalty %}
- Delayed Start Penalty: {{ delayedStartPenaltyAmount }}
{% endif %}
```

### 6. Terms and Conditions Section
```
TERMS AND CONDITIONS:

1. This offer is valid until {{ offerValidityDate }}.

2. Employment Type:
   {% if isContractEmployment %}
   This is a contract position for {{ contractDuration }}.
   {% else %}
   This is a permanent position.
   {% endif %}

3. Probation Period:
   {% if isUnderProbation %}
   You will be under probation for {{ probationPeriod }} months from your start date.
   {% else %}
   This position does not include a probation period.
   {% endif %}

4. Penalty Clauses:
   {% if hasLockInPenalty %}
   - Lock-in Period: You are required to serve a minimum of {{ lockInPenaltyMonths }} months.
   {% endif %}
   
   {% if hasDelayedStartPenalty %}
   - Delayed Start: {{ delayedStartPenaltyAmount }}
   {% endif %}
```

### 7. Signature Section
```
Please sign and return this offer letter to confirm your acceptance.

_________________________
{{ fullName }}
Date: _______________

_________________________
Company Representative
Date: _______________
```

## Conditional Section Examples

### Example 1: Employee with Probation and Contract
```
EMPLOYMENT DETAILS:
- Position: Software Engineer
- Employment Type: contract
- Start Date: 2024-01-15
- Probation Period: 6 months
- Contract Duration: 2 years
```

### Example 2: Permanent Employee without Probation
```
EMPLOYMENT DETAILS:
- Position: Senior Manager
- Employment Type: permanent
- Start Date: 2024-01-15
```

### Example 3: Employee with Lock-in Penalty
```
COMPENSATION & BENEFITS:
- Monthly Salary: SGD 8000
- Paid Leave: 21 days per year
- Medical Leave: 14 days per year
- Notice Period: 1 month
- Lock-in Period: 12 months
```

### Example 4: Employee with All Penalties
```
COMPENSATION & BENEFITS:
- Monthly Salary: SGD 10000
- Paid Leave: 21 days per year
- Medical Leave: 14 days per year
- Notice Period: 2 months
- Lock-in Period: 18 months
- Delayed Start Penalty: SGD 5000
```

## Template Tips

1. **Use conditional blocks**: Always wrap conditional content in `{% if %}` blocks to avoid showing empty sections.

2. **Format dates**: Consider formatting dates for better readability (e.g., "January 15, 2024" instead of "2024-01-15").

3. **Handle empty fields**: Use default values or conditional rendering for optional fields.

4. **Test scenarios**: Test your template with different combinations of conditional fields.

5. **Use formatted fields**: Use `{{ formattedSalary }}` and `{{ formattedPhone }}` for better presentation.

## Testing Your Template

To test your template, you can use the sample data provided in `sample_generate.py` or create test cases with different combinations of conditional fields:

```python
# Test case 1: Permanent employee with probation
test_data_1 = {
    "data": {
        "fullName": "John Doe",
        "employmentType": "permanent",
        "underProbation": "yes",
        "probationPeriod": "6",
        # ... other fields
    }
}

# Test case 2: Contract employee without probation
test_data_2 = {
    "data": {
        "fullName": "Jane Smith",
        "employmentType": "contract",
        "contractDuration": "2 years",
        "underProbation": "no",
        # ... other fields
    }
}
``` 