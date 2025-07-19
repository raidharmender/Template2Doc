import tempfile
import os
from docxtpl import DocxTemplate
from docx2pdf import convert

def generate_pdf(data: dict) -> str:
    # 1. Render DOCX from template
    template_path = os.path.join(os.path.dirname(__file__), 'docx_template.docx')
    doc = DocxTemplate(template_path)
    context = data.get('data', {})
    doc.render(context)
    tmp_docx = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
    doc.save(tmp_docx.name)
    # 2. Convert DOCX to PDF
    tmp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    convert(tmp_docx.name, tmp_pdf.name)
    return tmp_pdf.name 