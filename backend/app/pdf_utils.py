import os
from docxtpl import DocxTemplate
from docx2pdf import convert
import uuid

def generate_pdf(data: dict) -> str:
    # 1. Render DOCX from template
    template_path = os.path.join(os.path.dirname(__file__), 'docx_template.docx')
    doc = DocxTemplate(template_path)
    context = data.get('data', {})
    doc.render(context)
    # Save to backend/generated/
    gen_dir = os.path.join(os.path.dirname(__file__), '../generated')
    os.makedirs(gen_dir, exist_ok=True)
    docx_filename = f"offer_{uuid.uuid4().hex}.docx"
    pdf_filename = f"offer_{uuid.uuid4().hex}.pdf"
    docx_path = os.path.abspath(os.path.join(gen_dir, docx_filename))
    pdf_path = os.path.abspath(os.path.join(gen_dir, pdf_filename))
    doc.save(docx_path)
    # 2. Convert DOCX to PDF
    convert(docx_path, pdf_path)
    return pdf_path 