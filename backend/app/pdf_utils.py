import os
from docxtpl import DocxTemplate
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from app.docx_utils import generate_docx
import re

def generate_pdf(data: dict) -> str:
    """Generate PDF from offer letter data using reportlab"""
    # First generate DOCX to get the template context
    docx_path = generate_docx(data)
    
    # Create PDF path with same naming convention
    pdf_path = docx_path.replace('.docx', '.pdf')
    
    try:
        # Extract text content from DOCX and create PDF
        create_pdf_from_data(data, pdf_path)
        
        # Remove the temporary DOCX file
        os.remove(docx_path)
        return pdf_path
    except Exception as e:
        print(f"Error generating PDF: {e}")
        # If PDF generation fails, return the DOCX path
        return docx_path

def create_pdf_from_data(data: dict, pdf_path: str):
    """Create a professional PDF offer letter using reportlab"""
    doc = SimpleDocTemplate(pdf_path, pagesize=A4)
    styles = getSampleStyleSheet()
    
    # Create custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        spaceAfter=20,
        alignment=TA_CENTER,
        textColor='#2E86AB'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=12,
        spaceBefore=20,
        textColor='#2E86AB'
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=6,
        leading=14
    )
    
    # Build the PDF content
    story = []
    
    # Header
    story.append(Paragraph("SINGAPORE", title_style))
    story.append(Paragraph("OFFER OF EMPLOYMENT", title_style))
    story.append(Spacer(1, 20))
    
    # Get form data
    form_data = data.get('data', {})
    
    # Personal details
    story.append(Paragraph("PERSONAL DETAILS", heading_style))
    story.append(Paragraph(f"<b>Full Name:</b> {form_data.get('fullName', '')}", normal_style))
    story.append(Paragraph(f"<b>Father's Name:</b> {form_data.get('fatherName', '')}", normal_style))
    story.append(Paragraph(f"<b>NRIC/FIN:</b> {form_data.get('nricFin', '')}", normal_style))
    story.append(Paragraph(f"<b>Date of Birth:</b> {form_data.get('dateOfBirth', '')}", normal_style))
    story.append(Paragraph(f"<b>Nationality:</b> {form_data.get('nationality', '')}", normal_style))
    story.append(Paragraph(f"<b>Mobile:</b> {form_data.get('mobileNumber', '')}", normal_style))
    story.append(Paragraph(f"<b>Email:</b> {form_data.get('emailAddress', '')}", normal_style))
    
    # Address details
    if form_data.get('currentAddress'):
        story.append(Spacer(1, 10))
        story.append(Paragraph("ADDRESS DETAILS", heading_style))
        story.append(Paragraph(f"<b>Current Address:</b> {form_data.get('currentAddress', '')}", normal_style))
        story.append(Paragraph(f"<b>Permanent Address:</b> {form_data.get('permanentAddress', '')}", normal_style))
    
    # Employment details
    story.append(Spacer(1, 10))
    story.append(Paragraph("EMPLOYMENT DETAILS", heading_style))
    story.append(Paragraph(f"<b>Designation:</b> {form_data.get('designation', '')}", normal_style))
    story.append(Paragraph(f"<b>Employment Type:</b> {form_data.get('employmentType', 'permanent')}", normal_style))
    story.append(Paragraph(f"<b>Start Date:</b> {form_data.get('employmentStartDate', '')}", normal_style))
    
    # Probation period
    if form_data.get('underProbation') == 'yes':
        story.append(Paragraph(f"<b>Probation Period:</b> {form_data.get('probationPeriod', '')} months", normal_style))
    
    # Contract duration
    if form_data.get('employmentType') == 'contract':
        story.append(Paragraph(f"<b>Contract Duration:</b> {form_data.get('contractDuration', '')}", normal_style))
    
    # Compensation
    story.append(Spacer(1, 10))
    story.append(Paragraph("COMPENSATION & BENEFITS", heading_style))
    salary = form_data.get('monthlySalary', '')
    currency = form_data.get('salaryCurrency', 'SGD')
    story.append(Paragraph(f"<b>Monthly Salary:</b> {currency} {salary}", normal_style))
    story.append(Paragraph(f"<b>Annual Leave:</b> {form_data.get('paidLeaveEntitlement', '')} days per year", normal_style))
    story.append(Paragraph(f"<b>Medical Leave:</b> {form_data.get('medicalLeaveEntitlement', '')} days per year", normal_style))
    story.append(Paragraph(f"<b>Notice Period:</b> {form_data.get('noticePeriod', '')} months", normal_style))
    
    # Working hours
    story.append(Paragraph(f"<b>Working Hours:</b> {form_data.get('workingHours', '8 hours per day, 40 hours per week')}", normal_style))
    
    # Allowance
    if form_data.get('allowance') == 'yes':
        story.append(Spacer(1, 10))
        story.append(Paragraph("ALLOWANCE", heading_style))
        story.append(Paragraph("In addition, you may claim mobile reimbursement of up to S$50 per month, subject to submission of official receipts and approval by your reporting manager. Please note this is a reimbursable claim, not a fixed allowance, and may vary depending on project requirements.", normal_style))
    
    # Penalty clauses
    if form_data.get('lockInPenalty') == 'yes':
        story.append(Spacer(1, 10))
        story.append(Paragraph("LOCK-IN PERIOD", heading_style))
        story.append(Paragraph(f"You are required to serve a minimum of {form_data.get('lockInPenaltyMonths', '')} months. Early termination will result in a penalty.", normal_style))
    
    if form_data.get('delayedStartPenalty') == 'yes':
        story.append(Paragraph(f"<b>Delayed Start Penalty:</b> {form_data.get('delayedStartPenaltyAmount', '')}", normal_style))
    
    # Terms and conditions
    story.append(Spacer(1, 10))
    story.append(Paragraph("TERMS AND CONDITIONS", heading_style))
    story.append(Paragraph("1. This offer is valid until the specified date.", normal_style))
    story.append(Paragraph("2. All employment terms are subject to company policies.", normal_style))
    story.append(Paragraph("3. Confidentiality and non-competition clauses apply.", normal_style))
    
    # Offer validity
    if form_data.get('offerValidityDate'):
        story.append(Paragraph(f"<b>Offer Validity:</b> This offer is valid until {form_data.get('offerValidityDate', '')}", normal_style))
    
    # Signature section
    story.append(Spacer(1, 30))
    story.append(Paragraph("___________________________", normal_style))
    story.append(Paragraph("Employee Signature", normal_style))
    story.append(Paragraph(f"Name: {form_data.get('fullName', '')}", normal_style))
    story.append(Paragraph(f"Date: _______________", normal_style))
    
    story.append(Spacer(1, 20))
    story.append(Paragraph("___________________________", normal_style))
    story.append(Paragraph("Company Representative", normal_style))
    story.append(Paragraph("Date: _______________", normal_style))
    
    # Build the PDF
    doc.build(story) 