from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="WHIBC Portal API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Email Service Class
class EmailDeliveryError(Exception):
    pass

def send_email(to: str, subject: str, content: str, content_type: str = "html"):
    """Send email via SendGrid"""
    message = Mail(
        from_email=os.getenv('SENDER_EMAIL', 'wohibc2025@gmail.com'),
        to_emails=to,
        subject=subject,
        html_content=content if content_type == "html" else None,
        plain_text_content=content if content_type == "plain" else None
    )

    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        return response.status_code == 202
    except Exception as e:
        logging.error(f"Email send error: {str(e)}")
        raise EmailDeliveryError(f"Failed to send email: {str(e)}")


# Define Models
class StudentRegistration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    date_of_birth: str
    gender: str
    address: str
    email: EmailStr
    phone_number: str
    educational_background: str
    program_applied: str
    study_mode: str  # On-campus / Online / Hybrid
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StudentRegistrationCreate(BaseModel):
    full_name: str
    date_of_birth: str
    gender: str
    address: str
    email: EmailStr
    phone_number: str
    educational_background: str
    program_applied: str
    study_mode: str

class Partnership(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    organization_name: str
    contact_person: str
    email: EmailStr
    phone_number: str
    partnership_type: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PartnershipCreate(BaseModel):
    organization_name: str
    contact_person: str
    email: EmailStr
    phone_number: str
    partnership_type: str
    message: str

class EmailResponse(BaseModel):
    status: str
    message: str


# Helper functions to prepare data for MongoDB
def prepare_for_mongo(data):
    """Convert datetime objects to ISO strings for MongoDB storage"""
    if isinstance(data.get('created_at'), datetime):
        data['created_at'] = data['created_at'].isoformat()
    return data


# Email templates
def send_registration_confirmation(email: str, full_name: str, program: str):
    """Send registration confirmation email"""
    subject = "Registration Confirmation - Word of Hope International Bible College"
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1e4a72; text-align: center;">Word of Hope International Bible College</h2>
                <h3 style="color: #2e7d32;">Registration Confirmation</h3>
                
                <p>Dear {full_name},</p>
                
                <p>Thank you for your registration with Word of Hope International Bible College. We have successfully received your application for the <strong>{program}</strong> program.</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #1e4a72; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #1e4a72;">What's Next?</h4>
                    <ul>
                        <li>Our admissions team will review your application</li>
                        <li>You will receive further instructions within 3-5 business days</li>
                        <li>Please prepare any additional documents that may be required</li>
                    </ul>
                </div>
                
                <p><strong>Our Motto:</strong> Excellence in Academic and Character</p>
                
                <p>For any questions, please contact us:</p>
                <ul>
                    <li>Email: wohibc2025@gmail.com</li>
                    <li>Phone: +2349042520176 / +2349157788318</li>
                </ul>
                
                <p>Blessings,<br>
                <strong>Word of Hope International Bible College<br>
                Admissions Office</strong></p>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                    Affiliated with Triumphant Christian University of America<br>
                    Canada Address: 200 Bay Street South Apartment, 814 Hamilton, Ontario L8P 4S4<br>
                    Nigeria Study Centre: Life Giving Word Mission Inc., 37 Amuri Road Achakpa, Abakpa, Enugu State
                </p>
            </div>
        </body>
    </html>
    """
    
    return send_email(email, subject, html_content)

def send_partnership_acknowledgment(email: str, organization: str, partnership_type: str):
    """Send partnership acknowledgment email"""
    subject = "Partnership Application Received - Word of Hope International Bible College"
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1e4a72; text-align: center;">Word of Hope International Bible College</h2>
                <h3 style="color: #2e7d32;">Partnership Application Received</h3>
                
                <p>Dear Partner,</p>
                
                <p>Thank you for your interest in partnering with Word of Hope International Bible College. We have received your application for <strong>{partnership_type}</strong> from <strong>{organization}</strong>.</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #2e7d32; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #2e7d32;">Partnership Vision</h4>
                    <p>Together, we are committed to advancing research, policy formation, and training of Christian leaders at national and global levels.</p>
                </div>
                
                <p>Our partnership team will review your application and contact you within 5-7 business days to discuss next steps.</p>
                
                <p>For immediate questions, please contact us:</p>
                <ul>
                    <li>Email: wohibc2025@gmail.com</li>
                    <li>Phone: +2349042520176 / +2349157788318</li>
                </ul>
                
                <p>Blessings,<br>
                <strong>Word of Hope International Bible College<br>
                Partnership Development Team</strong></p>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                    Excellence in Academic and Character<br>
                    Affiliated with Triumphant Christian University of America
                </p>
            </div>
        </body>
    </html>
    """
    
    return send_email(email, subject, html_content)


# API Routes
@api_router.get("/")
async def root():
    return {"message": "Word of Hope International Bible College API", "status": "active"}

@api_router.post("/register-student", response_model=EmailResponse)
async def register_student(registration: StudentRegistrationCreate, background_tasks: BackgroundTasks):
    """Register a new student"""
    try:
        # Create registration object
        student_dict = registration.dict()
        student_obj = StudentRegistration(**student_dict)
        
        # Prepare for MongoDB and save
        mongo_data = prepare_for_mongo(student_obj.dict())
        await db.student_registrations.insert_one(mongo_data)
        
        # Send confirmation email in background
        background_tasks.add_task(
            send_registration_confirmation,
            registration.email,
            registration.full_name,
            registration.program_applied
        )
        
        return EmailResponse(
            status="success",
            message="Registration submitted successfully! Check your email for confirmation."
        )
    except Exception as e:
        logging.error(f"Student registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Registration failed. Please try again.")

@api_router.post("/submit-partnership", response_model=EmailResponse)
async def submit_partnership(partnership: PartnershipCreate, background_tasks: BackgroundTasks):
    """Submit partnership application"""
    try:
        # Create partnership object
        partnership_dict = partnership.dict()
        partnership_obj = Partnership(**partnership_dict)
        
        # Prepare for MongoDB and save
        mongo_data = prepare_for_mongo(partnership_obj.dict())
        await db.partnerships.insert_one(mongo_data)
        
        # Send acknowledgment email in background
        background_tasks.add_task(
            send_partnership_acknowledgment,
            partnership.email,
            partnership.organization_name,
            partnership.partnership_type
        )
        
        return EmailResponse(
            status="success",
            message="Partnership application submitted successfully! We'll contact you soon."
        )
    except Exception as e:
        logging.error(f"Partnership submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Partnership submission failed. Please try again.")

@api_router.get("/registrations", response_model=List[StudentRegistration])
async def get_registrations():
    """Get all student registrations (admin endpoint)"""
    try:
        registrations = await db.student_registrations.find().to_list(1000)
        return [StudentRegistration(**reg) for reg in registrations]
    except Exception as e:
        logging.error(f"Get registrations error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch registrations")

@api_router.get("/partnerships", response_model=List[Partnership])
async def get_partnerships():
    """Get all partnerships (admin endpoint)"""
    try:
        partnerships = await db.partnerships.find().to_list(1000)
        return [Partnership(**partnership) for partnership in partnerships]
    except Exception as e:
        logging.error(f"Get partnerships error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch partnerships")

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "whibc-api"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()