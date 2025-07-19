from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import tempfile

def generate_pdf(data: dict) -> str:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    c = canvas.Canvas(tmp.name, pagesize=A4)
    width, height = A4
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, height - 50, "Offer Letter")
    c.setFont("Helvetica", 12)
    y = height - 100
    for key, value in data.get('data', {}).items():
        c.drawString(50, y, f"{key}: {value}")
        y -= 20
        if y < 50:
            c.showPage()
            y = height - 50
    c.save()
    return tmp.name 