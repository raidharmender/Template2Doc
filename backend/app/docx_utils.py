from docx import Document
from docx.shared import Pt
import os
from docxtpl import DocxTemplate
import csv
from datetime import datetime

def generate_docx(data: dict) -> str:
    # Use the OfferLetterFinal.docx template
    template_path = os.path.join(os.path.dirname(__file__), 'OfferLetterFinal.docx')
    
    # Check if template exists
    if not os.path.exists(template_path):
        raise FileNotFoundError(f"Template file not found: {template_path}")
    
    doc = DocxTemplate(template_path)
    context = data.get('data', {})
    
    # Process conditional fields and create template context
    template_context = process_conditional_fields(context)
    
    doc.render(template_context)
    
    # Save to backend/offer_letters/ folder
    gen_dir = os.path.join(os.path.dirname(__file__), '../offer_letters')
    os.makedirs(gen_dir, exist_ok=True)
    
    import uuid
    # Generate filename with candidate name and date
    candidate_name = context.get('fullName', 'Unknown').replace(' ', '_')
    current_date = datetime.now().strftime('%Y%m%d')
    filename = f"Offer_Letter_{candidate_name}_{current_date}.docx"
    file_path = os.path.abspath(os.path.join(gen_dir, filename))
    doc.save(file_path)
    return file_path

def process_conditional_fields(context: dict) -> dict:
    """
    Process conditional fields and create template context with proper field mapping
    based on the place_holder_list.csv
    """
    template_context = {}
    
    # Load placeholder mappings from CSV
    placeholder_mappings = load_placeholder_mappings()
    
    # Apply field mappings based on CSV
    for field_info in placeholder_mappings:
        field_name = field_info['Field']
        placeholder = field_info['Place Holder']
        conditions = field_info['Conditions']
        
        # Map frontend fields to template placeholders
        template_field = placeholder.strip('{}').strip()
        
        # Apply conditional logic based on the conditions column
        if should_include_field(field_name, context, conditions):
            value = get_field_value(field_name, context)
            if value:
                template_context[template_field] = value
            else:
                template_context[template_field] = ''
        else:
            template_context[template_field] = ''
    
    # Handle special conditional logic
    template_context = apply_special_conditions(template_context, context)
    
    return template_context

def load_placeholder_mappings():
    """Load placeholder mappings from the CSV file"""
    csv_path = os.path.join(os.path.dirname(__file__), 'place_holder_list.csv')
    mappings = []
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                mappings.append(row)
    except Exception as e:
        print(f"Warning: Could not load placeholder mappings: {e}")
        # Fallback to default mappings
        mappings = get_default_mappings()
    
    return mappings

def get_default_mappings():
    """Fallback default mappings if CSV cannot be loaded"""
    return [
        {'Field': 'Full Name', 'Place Holder': '{{full_name}}', 'Conditions': ''},
        {'Field': 'Father\'s Name', 'Place Holder': '{{father_name}}', 'Conditions': ''},
        {'Field': 'NRIC/FIN No', 'Place Holder': '{{NRIC}}', 'Conditions': ''},
        {'Field': 'Date Of Birth', 'Place Holder': '{{DOB}}', 'Conditions': ''},
        {'Field': 'Nationality', 'Place Holder': '{{Nationality}}', 'Conditions': ''},
        {'Field': 'Mobile', 'Place Holder': '{{Mobile}}', 'Conditions': ''},
        {'Field': 'Emergency Contact', 'Place Holder': '{{Emergency Number}}', 'Conditions': ''},
        {'Field': 'Current Address', 'Place Holder': '{{Current_Address}}', 'Conditions': ''},
        {'Field': 'Permanent Address', 'Place Holder': '{{Permanent_Address}}', 'Conditions': ''},
        {'Field': 'Email', 'Place Holder': '{{Email}}', 'Conditions': ''},
        {'Field': 'Designation / Job Title', 'Place Holder': '{{Role_name}}', 'Conditions': ''},
        {'Field': 'Probation Period (months)', 'Place Holder': '{{probation}}', 'Conditions': ''},
        {'Field': 'Contract Duration', 'Place Holder': '{{Contract_Durations}}', 'Conditions': ''},
        {'Field': 'Monthly Salary', 'Place Holder': '{{salary}}', 'Conditions': 'Must be in text too'},
        {'Field': 'Paid Leave (days/year)', 'Place Holder': '{{annual_leave}}', 'Conditions': ''},
        {'Field': 'Medical Leave (days/year)', 'Place Holder': '{{medical_leave}}', 'Conditions': ''},
        {'Field': 'Notice Period for Termination', 'Place Holder': '{{Notice_period}}', 'Conditions': ''},
        {'Field': 'Employment Start Date', 'Place Holder': '{{Employment_Start_Date}}', 'Conditions': ''},
        {'Field': 'Offer Validity Date', 'Place Holder': '{{Offer_validity}}', 'Conditions': ''},
    ]

def should_include_field(field_name: str, context: dict, conditions: str) -> bool:
    """Determine if a field should be included based on conditions"""
    if not conditions or conditions.strip() == '':
        return True
    
    # Handle specific conditional logic
    if 'allowance' in field_name.lower():
        # Check if allowance is enabled
        return context.get('allowance') == 'yes'
    
    if 'probation' in field_name.lower():
        # Check if under probation
        return context.get('underProbation') == 'yes'
    
    if 'contract' in field_name.lower():
        # Check if contract employment
        return context.get('employmentType') == 'contract'
    
    if 'lock_in' in field_name.lower() or 'lock-in' in field_name.lower():
        # Check if lock-in penalty is enabled
        return context.get('lockInPenalty') == 'yes'
    
    return True

def get_field_value(field_name: str, context: dict) -> str:
    """Get the value for a field from the context"""
    field_mappings = {
        'Full Name': 'fullName',
        'Father\'s Name': 'fatherName',
        'NRIC/FIN No': 'nricFin',
        'Date Of Birth': 'dateOfBirth',
        'Nationality': 'nationality',
        'Mobile': 'mobileNumber',
        'Emergency Contact': 'emergencyContact',
        'Current Address': 'currentAddress',
        'Permanent Address': 'permanentAddress',
        'Email': 'emailAddress',
        'Designation / Job Title': 'designation',
        'Probation Period (months)': 'probationPeriod',
        'Contract Duration': 'contractDuration',
        'Monthly Salary': 'monthlySalary',
        'Paid Leave (days/year)': 'paidLeaveEntitlement',
        'Medical Leave (days/year)': 'medicalLeaveEntitlement',
        'Notice Period for Termination': 'noticePeriod',
        'Employment Start Date': 'employmentStartDate',
        'Offer Validity Date': 'offerValidityDate',
        'Allowance (YES/NO)': 'allowance',
        'Working Hours': 'workingHours',
        'Lock-in Period Penalty': 'lockInPenaltyMonths',
        'Lock-in Period': 'lockInPenaltyMonths',
        'Penalty Amount': 'delayedStartPenaltyAmount',
    }
    
    frontend_field = field_mappings.get(field_name, field_name.lower().replace(' ', ''))
    value = context.get(frontend_field, '')
    
    # Handle special formatting
    if field_name == 'Monthly Salary' and value:
        currency = context.get('salaryCurrency', 'SGD')
        return f"{currency} {value}"
    
    if field_name == 'Mobile' and value:
        country_code = context.get('countryCode', '')
        if country_code:
            return f"{country_code} {value}"
    
    return str(value) if value else ''

def apply_special_conditions(template_context: dict, context: dict) -> dict:
    """Apply special conditional logic for complex scenarios"""
    
    # Handle allowance text based on CSV conditions
    if context.get('allowance') == 'yes':
        template_context['allowance_text'] = (
            "In addition, you may claim mobile reimbursement of up to S$50 per month, "
            "subject to submission of official receipts and approval by your reporting manager. "
            "Please note this is a reimbursable claim, not a fixed allowance, and may vary "
            "depending on project requirements."
        )
    else:
        template_context['allowance_text'] = ''
    
    # Handle probation notice
    if context.get('underProbation') == 'yes':
        template_context['probation_notice'] = context.get('probationPeriod', '')
    else:
        template_context['probation_notice'] = ''
    
    # Handle working hours (default if not specified)
    if not template_context.get('working_hour'):
        template_context['working_hour'] = '8 hours per day, 40 hours per week'
    
    return template_context 