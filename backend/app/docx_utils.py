from docx import Document
from docx.shared import Pt
import os
from docxtpl import DocxTemplate

def generate_docx(data: dict) -> str:
    template_path = os.path.join(os.path.dirname(__file__), 'docx_template.docx')
    doc = DocxTemplate(template_path)
    context = data.get('data', {})
    doc.render(context)
    # Save to backend/generated/
    gen_dir = os.path.join(os.path.dirname(__file__), '../generated')
    os.makedirs(gen_dir, exist_ok=True)
    import uuid
    filename = f"offer_{uuid.uuid4().hex}.docx"
    file_path = os.path.abspath(os.path.join(gen_dir, filename))
    doc.save(file_path)
    return file_path 