from app.pdf_utils import generate_pdf
from app.docx_utils import generate_docx
import os

sample_data = {
    "data": {
        "fullName": "Alice Johnson",
        "emailAddress": "alice.johnson@example.com",
        "designation": "Software Engineer",
        "monthlySalary": "$8000",
        "employmentStartDate": "2024-08-01",
        "nationality": "Singaporean",
        "currentAddress": "123 Orchard Road, Singapore",
        "noticePeriod": "2 months",
        "offerValidityDate": "2024-08-15"
    }
}

pdf_path = generate_pdf(sample_data)
docx_path = generate_docx(sample_data)

print(f"Sample PDF generated at: {pdf_path}")
print(f"Sample DOCX generated at: {docx_path}") 