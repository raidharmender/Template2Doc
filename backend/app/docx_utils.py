from docx import Document
import tempfile

def generate_docx(data: dict) -> str:
    doc = Document()
    doc.add_heading('Offer Letter', 0)
    for key, value in data.get('data', {}).items():
        doc.add_paragraph(f"{key}: {value}")
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
    doc.save(tmp.name)
    return tmp.name 