from docx import Document
from docx.shared import Pt
import tempfile
import os
from docxtpl import DocxTemplate

def generate_docx(data: dict) -> str:
    template_path = os.path.join(os.path.dirname(__file__), 'docx_template.docx')
    doc = DocxTemplate(template_path)
    context = data.get('data', {})
    doc.render(context)
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
    doc.save(tmp.name)
    return tmp.name 