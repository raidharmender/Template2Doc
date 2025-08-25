import requests
import json

# Sample test data with new fields from the CSV
test_data = {
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
        # New fields from CSV
        "allowance": "yes",
        "workingHours": "8 hours per day, 40 hours per week"
    }
}

def test_api():
    base_url = "http://localhost:8000"
    
    print("=== Testing Updated Offer Letter API with New Template ===\n")
    
    # Test 1: Get all offer letters
    print("1. Getting all existing offer letters...")
    try:
        response = requests.get(f"{base_url}/api/offer-letter/all")
        if response.status_code == 200:
            offers = response.json()
            print(f"   Found {len(offers)} existing offer letters")
        else:
            print(f"   Error: {response.status_code}")
    except Exception as e:
        print(f"   Error: {e}")
    
    # Test 2: Create a new offer letter with updated template
    print("\n2. Creating a new offer letter with new template...")
    try:
        response = requests.post(
            f"{base_url}/api/offer-letter",
            headers={"Content-Type": "application/json"},
            json=test_data
        )
        if response.status_code == 200:
            result = response.json()
            offer_id = result["id"]
            print(f"   Success! Created offer letter with ID: {offer_id}")
            
            # Test 3: Download PDF
            print(f"\n3. Downloading PDF for offer letter {offer_id}...")
            pdf_response = requests.get(f"{base_url}/api/offer-letter/{offer_id}/pdf")
            if pdf_response.status_code == 200:
                with open(f"test_offer_letter_{offer_id}.pdf", "wb") as f:
                    f.write(pdf_response.content)
                print(f"   PDF downloaded successfully: test_offer_letter_{offer_id}.pdf")
            else:
                print(f"   Error downloading PDF: {pdf_response.status_code}")
                
        else:
            print(f"   Error creating offer letter: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   Error: {e}")
    
    print("\n=== Test completed ===")
    print("Note: New offer letters are now saved in the 'offer_letters' directory")

if __name__ == "__main__":
    test_api() 