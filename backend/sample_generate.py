from app.pdf_utils import generate_pdf
from app.docx_utils import generate_docx
import os

# Sample data with all fields populated (including conditional fields)
comprehensive_sample_data = {
    "data": {
        # Personal Information
        "fullName": "Alice Johnson",
        "fatherName": "Robert Johnson",
        "nricFin": "S1234567A",
        "dateOfBirth": "1990-05-15",
        "nationality": "Singaporean",
        "country": "Singapore",
        "countryCode": "+65",
        "mobileNumber": "91234567",
        "emailAddress": "alice.johnson@example.com",
        "designation": "Senior Software Engineer",
        "emergencyContact": "Robert Johnson (+65 91234568)",
        "maritalStatus": "single",
        "visaCategory": "Local",
        
        # Address Information
        "currentAddress": "123 Orchard Road, #12-34, Singapore 238859",
        "permanentAddress": "123 Orchard Road, #12-34, Singapore 238859",
        
        # Employment Details
        "underProbation": "yes",
        "probationPeriod": "6",
        "employmentType": "permanent",
        "contractDuration": "",
        "employmentStartDate": "2024-08-01",
        
        # Compensation
        "monthlySalary": "8000",
        "salaryCurrency": "SGD",
        "paidLeaveEntitlement": "21",
        "medicalLeaveEntitlement": "14",
        "noticePeriod": "2 months",
        "offerValidityDate": "2024-08-15",
        "lockInPenalty": "yes",
        "lockInPenaltyMonths": "12",
        "delayedStartPenalty": "yes",
        "delayedStartPenaltyAmount": "SGD 5000"
    }
}

# Test case 1: Contract employee with probation
contract_employee_data = {
    "data": {
        # Personal Information
        "fullName": "Bob Chen",
        "fatherName": "David Chen",
        "nricFin": "S9876543B",
        "dateOfBirth": "1988-12-20",
        "nationality": "Singaporean",
        "country": "Singapore",
        "countryCode": "+65",
        "mobileNumber": "87654321",
        "emailAddress": "bob.chen@example.com",
        "designation": "Data Scientist",
        "emergencyContact": "David Chen (+65 87654322)",
        "maritalStatus": "married",
        "visaCategory": "EP",
        
        # Address Information
        "currentAddress": "456 Marina Bay, #08-15, Singapore 018956",
        "permanentAddress": "456 Marina Bay, #08-15, Singapore 018956",
        
        # Employment Details
        "underProbation": "yes",
        "probationPeriod": "3",
        "employmentType": "contract",
        "contractDuration": "2 years",
        "employmentStartDate": "2024-09-01",
        
        # Compensation
        "monthlySalary": "7500",
        "salaryCurrency": "SGD",
        "paidLeaveEntitlement": "18",
        "medicalLeaveEntitlement": "12",
        "noticePeriod": "1 month",
        "offerValidityDate": "2024-09-15",
        "lockInPenalty": "no",
        "lockInPenaltyMonths": "",
        "delayedStartPenalty": "no",
        "delayedStartPenaltyAmount": ""
    }
}

# Test case 2: Permanent employee without probation
permanent_employee_data = {
    "data": {
        # Personal Information
        "fullName": "Carol Tan",
        "fatherName": "Michael Tan",
        "nricFin": "S5556667C",
        "dateOfBirth": "1992-03-10",
        "nationality": "Singaporean",
        "country": "Singapore",
        "countryCode": "+65",
        "mobileNumber": "76543210",
        "emailAddress": "carol.tan@example.com",
        "designation": "Product Manager",
        "emergencyContact": "Michael Tan (+65 76543211)",
        "maritalStatus": "single",
        "visaCategory": "Local",
        
        # Address Information
        "currentAddress": "789 Sentosa Cove, #05-20, Singapore 098269",
        "permanentAddress": "789 Sentosa Cove, #05-20, Singapore 098269",
        
        # Employment Details
        "underProbation": "no",
        "probationPeriod": "",
        "employmentType": "permanent",
        "contractDuration": "",
        "employmentStartDate": "2024-10-01",
        
        # Compensation
        "monthlySalary": "9000",
        "salaryCurrency": "SGD",
        "paidLeaveEntitlement": "25",
        "medicalLeaveEntitlement": "18",
        "noticePeriod": "3 months",
        "offerValidityDate": "2024-10-15",
        "lockInPenalty": "yes",
        "lockInPenaltyMonths": "18",
        "delayedStartPenalty": "no",
        "delayedStartPenaltyAmount": ""
    }
}

# Test case 3: Foreign employee with all penalties
foreign_employee_data = {
    "data": {
        # Personal Information
        "fullName": "David Kumar",
        "fatherName": "Rajesh Kumar",
        "nricFin": "E1234567D",
        "dateOfBirth": "1985-08-25",
        "nationality": "Indian",
        "country": "India",
        "countryCode": "+91",
        "mobileNumber": "9876543210",
        "emailAddress": "david.kumar@example.com",
        "designation": "Technical Lead",
        "emergencyContact": "Rajesh Kumar (+91 9876543211)",
        "maritalStatus": "married",
        "visaCategory": "EP",
        
        # Address Information
        "currentAddress": "321 Raffles Place, #15-30, Singapore 048710",
        "permanentAddress": "456 MG Road, Bangalore, Karnataka, India 560001",
        
        # Employment Details
        "underProbation": "yes",
        "probationPeriod": "12",
        "employmentType": "contract",
        "contractDuration": "3 years",
        "employmentStartDate": "2024-11-01",
        
        # Compensation
        "monthlySalary": "12000",
        "salaryCurrency": "SGD",
        "paidLeaveEntitlement": "21",
        "medicalLeaveEntitlement": "14",
        "noticePeriod": "2 months",
        "offerValidityDate": "2024-11-15",
        "lockInPenalty": "yes",
        "lockInPenaltyMonths": "24",
        "delayedStartPenalty": "yes",
        "delayedStartPenaltyAmount": "SGD 10000"
    }
}

def generate_test_documents():
    """Generate test documents for all scenarios"""
    
    test_cases = [
        ("comprehensive", comprehensive_sample_data),
        ("contract_employee", contract_employee_data),
        ("permanent_employee", permanent_employee_data),
        ("foreign_employee", foreign_employee_data)
    ]
    
    for test_name, test_data in test_cases:
        print(f"\nGenerating documents for {test_name}...")
        
        try:
            # Generate DOCX
            docx_path = generate_docx(test_data)
            print(f"DOCX generated: {docx_path}")
            
            # Generate PDF
            pdf_path = generate_pdf(test_data)
            print(f"PDF generated: {pdf_path}")
            
        except Exception as e:
            print(f"Error generating documents for {test_name}: {e}")

if __name__ == "__main__":
    print("Generating test documents for all scenarios...")
    generate_test_documents()
    print("\nTest document generation completed!") 