#!/usr/bin/env python3
"""
Standalone script to generate an offer letter using the template and dummy data.
This script demonstrates how the backend/app generates offer letters.
"""

import os
import sys
from datetime import datetime

# Add the app directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.docx_utils import generate_docx
from app.pdf_utils import generate_pdf

# Dummy offer letter data from test_api.py
dummy_data = {
    "data": {
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
        "currentAddress": "123 Orchard Road, #12-34, Singapore 238859",
        "permanentAddress": "123 Orchard Road, #12-34, Singapore 238859",
        "underProbation": "yes",
        "probationPeriod": "6",
        "employmentType": "permanent",
        "contractDuration": "",
        "employmentStartDate": "2024-08-01",
        "monthlySalary": "8000",
        "salaryCurrency": "SGD",
        "paidLeaveEntitlement": "21",
        "medicalLeaveEntitlement": "14",
        "noticePeriod": "2 months",
        "offerValidityDate": "2024-08-15",
        "lockInPenalty": "yes",
        "lockInPenaltyMonths": "12",
        "delayedStartPenalty": "yes",
        "delayedStartPenaltyAmount": "SGD 5000",
        "allowance": "yes",
        "workingHours": "8 hours per day, 40 hours per week"
    }
}

def main():
    print("=== Generating Offer Letter with Dummy Data ===\n")
    
    try:
        # Check if template exists
        template_path = os.path.join(os.path.dirname(__file__), 'app', 'OfferLetterFinal.docx')
        if not os.path.exists(template_path):
            print(f"❌ Template file not found: {template_path}")
            print("Please ensure OfferLetterFinal.docx exists in the backend/app/ directory")
            return False
        
        print(f"✅ Template found: {template_path}")
        
        # Generate DOCX file
        print("\n1. Generating DOCX file...")
        docx_path = generate_docx(dummy_data)
        print(f"✅ DOCX generated: {docx_path}")
        
        # Generate PDF file
        print("\n2. Generating PDF file...")
        pdf_path = generate_pdf(dummy_data)
        print(f"✅ PDF generated: {pdf_path}")
        
        # Display file information
        print("\n=== Generated Files ===")
        print(f"DOCX: {os.path.basename(docx_path)}")
        print(f"PDF: {os.path.basename(pdf_path)}")
        
        # Check file sizes
        docx_size = os.path.getsize(docx_path) / 1024  # KB
        pdf_size = os.path.getsize(pdf_path) / 1024    # KB
        print(f"DOCX Size: {docx_size:.1f} KB")
        print(f"PDF Size: {pdf_size:.1f} KB")
        
        print("\n=== Offer Letter Generation Complete ===")
        print("Files are saved in the backend/offer_letters/ directory")
        
        return True
        
    except Exception as e:
        print(f"❌ Error generating offer letter: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
