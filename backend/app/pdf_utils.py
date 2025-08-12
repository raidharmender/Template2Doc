import os
from docxtpl import DocxTemplate
from docx2pdf import convert
import uuid
from app.docx_utils import generate_docx

def generate_pdf(data: dict) -> str:
    # First generate DOCX
    docx_path = generate_docx(data)
    
    # Convert to PDF with same naming convention
    pdf_path = docx_path.replace('.docx', '.pdf')
    
    try:
        convert(docx_path, pdf_path)
        # Remove the temporary DOCX file
        return pdf_path
    except Exception as e:
        print(f"Error converting DOCX to PDF: {e}")
        # If PDF conversion fails, return the DOCX path
        return docx_path 