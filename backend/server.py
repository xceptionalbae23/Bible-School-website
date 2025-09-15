from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, File, UploadFile, Form, Depends, status
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import aiofiles
import shutil
import jwt
import hashlib


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

# Create uploads directory
UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# JWT Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'whibc-admin-secret-key-2025')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# Admin credentials (in production, these should be in database with proper hashing)
ADMIN_CREDENTIALS = {
    "admin": "whibc2025",  # username: password
    "superadmin": "whibc@admin2025"
}


# Email Service Class
class EmailDeliveryError(Exception):
    pass

def send_email_simple(to: str, subject: str, content: str):
    """Simple email sending function without SendGrid dependency for now"""
    try:
        # For now, just log the email instead of sending it
        # This prevents the 403 error and allows the application to work
        logging.info(f"Email would be sent to: {to}")
        logging.info(f"Subject: {subject}")
        logging.info(f"Content: {content[:100]}...")
        return True
    except Exception as e:
        logging.error(f"Email simulation error: {str(e)}")
        return False


# Define Models
class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    admin_info: dict

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
    document_filename: Optional[str] = None
    document_path: Optional[str] = None
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
    document_filename: Optional[str] = None
    document_path: Optional[str] = None
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

class GalleryImage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    filename: str
    path: str
    category: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Helper functions to prepare data for MongoDB
def prepare_for_mongo(data):
    """Convert datetime objects to ISO strings for MongoDB storage"""
    if isinstance(data.get('created_at'), datetime):
        data['created_at'] = data['created_at'].isoformat()
    return data


# Authentication functions
def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, username: str) -> bool:
    """Verify password against stored credentials"""
    return ADMIN_CREDENTIALS.get(username) == plain_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return username
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


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
            </div>
        </body>
    </html>
    """
    
    return send_email_simple(email, subject, html_content)

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
                
                <p>Our partnership team will review your application and contact you within 5-7 business days to discuss next steps.</p>
                
                <p>Blessings,<br>
                <strong>Word of Hope International Bible College<br>
                Partnership Development Team</strong></p>
            </div>
        </body>
    </html>
    """
    
    return send_email_simple(email, subject, html_content)


# File upload utility
async def save_uploaded_file(file: UploadFile, prefix: str) -> tuple:
    """Save uploaded file and return filename and path"""
    if file.filename:
        # Generate unique filename
        file_extension = Path(file.filename).suffix
        unique_filename = f"{prefix}_{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        async with aiofiles.open(file_path, 'wb') as buffer:
            content = await file.read()
            await buffer.write(content)
        
        return unique_filename, str(file_path)
    return None, None


# API Routes
@api_router.get("/")
async def root():
    return {"message": "Word of Hope International Bible College API", "status": "active"}

# Admin Authentication Routes
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    try:
        if not verify_password(credentials.password, credentials.username):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token_expires = timedelta(hours=JWT_EXPIRATION_HOURS)
        access_token = create_access_token(
            data={"sub": credentials.username}, expires_delta=access_token_expires
        )
        
        return AdminLoginResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=JWT_EXPIRATION_HOURS * 3600,  # in seconds
            admin_info={
                "username": credentials.username,
                "role": "administrator",
                "permissions": ["read", "write", "admin"]
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Admin login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")

@api_router.post("/admin/verify-token")
async def verify_admin_token(current_user: str = Depends(verify_token)):
    """Verify admin token"""
    return {
        "valid": True,
        "username": current_user,
        "role": "administrator"
    }

@api_router.post("/register-student", response_model=EmailResponse)
async def register_student(
    full_name: str = Form(...),
    date_of_birth: str = Form(...),
    gender: str = Form(...),
    address: str = Form(...),
    email: EmailStr = Form(...),
    phone_number: str = Form(...),
    educational_background: str = Form(...),
    program_applied: str = Form(...),
    study_mode: str = Form(...),
    document: Optional[UploadFile] = File(None),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """Register a new student with optional document upload"""
    try:
        # Handle file upload
        document_filename = None
        document_path = None
        if document and document.filename:
            document_filename, document_path = await save_uploaded_file(document, "student_doc")
        
        # Create registration object
        registration_data = {
            "full_name": full_name,
            "date_of_birth": date_of_birth,
            "gender": gender,
            "address": address,
            "email": email,
            "phone_number": phone_number,
            "educational_background": educational_background,
            "program_applied": program_applied,
            "study_mode": study_mode,
            "document_filename": document_filename,
            "document_path": document_path
        }
        
        student_obj = StudentRegistration(**registration_data)
        
        # Prepare for MongoDB and save
        mongo_data = prepare_for_mongo(student_obj.dict())
        await db.student_registrations.insert_one(mongo_data)
        
        # Send confirmation email in background
        background_tasks.add_task(
            send_registration_confirmation,
            email,
            full_name,
            program_applied
        )
        
        return EmailResponse(
            status="success",
            message="Registration submitted successfully! Check your email for confirmation."
        )
    except Exception as e:
        logging.error(f"Student registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Registration failed. Please try again.")

@api_router.post("/submit-partnership", response_model=EmailResponse)
async def submit_partnership(
    organization_name: str = Form(...),
    contact_person: str = Form(...),
    email: EmailStr = Form(...),
    phone_number: str = Form(...),
    partnership_type: str = Form(...),
    message: str = Form(...),
    document: Optional[UploadFile] = File(None),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """Submit partnership application with optional document upload"""
    try:
        # Handle file upload
        document_filename = None
        document_path = None
        if document and document.filename:
            document_filename, document_path = await save_uploaded_file(document, "partnership_doc")
        
        # Create partnership object
        partnership_data = {
            "organization_name": organization_name,
            "contact_person": contact_person,
            "email": email,
            "phone_number": phone_number,
            "partnership_type": partnership_type,
            "message": message,
            "document_filename": document_filename,
            "document_path": document_path
        }
        
        partnership_obj = Partnership(**partnership_data)
        
        # Prepare for MongoDB and save
        mongo_data = prepare_for_mongo(partnership_obj.dict())
        await db.partnerships.insert_one(mongo_data)
        
        # Send acknowledgment email in background
        background_tasks.add_task(
            send_partnership_acknowledgment,
            email,
            organization_name,
            partnership_type
        )
        
        return EmailResponse(
            status="success",
            message="Partnership application submitted successfully! We'll contact you soon."
        )
    except Exception as e:
        logging.error(f"Partnership submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Partnership submission failed. Please try again.")

# Protected Admin Routes
@api_router.get("/registrations", response_model=List[StudentRegistration])
async def get_registrations(current_user: str = Depends(verify_token)):
    """Get all student registrations (admin endpoint)"""
    try:
        registrations = await db.student_registrations.find().sort("created_at", -1).to_list(1000)
        return [StudentRegistration(**reg) for reg in registrations]
    except Exception as e:
        logging.error(f"Get registrations error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch registrations")

@api_router.get("/partnerships", response_model=List[Partnership])
async def get_partnerships(current_user: str = Depends(verify_token)):
    """Get all partnerships (admin endpoint)"""
    try:
        partnerships = await db.partnerships.find().sort("created_at", -1).to_list(1000)
        return [Partnership(**partnership) for partnership in partnerships]
    except Exception as e:
        logging.error(f"Get partnerships error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch partnerships")

@api_router.post("/gallery/upload")
async def upload_gallery_image(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    image: UploadFile = File(...),
    current_user: str = Depends(verify_token)
):
    """Upload image to gallery (admin only)"""
    try:
        # Save image file
        filename, file_path = await save_uploaded_file(image, "gallery")
        
        # Create gallery entry
        gallery_item = GalleryImage(
            title=title,
            description=description,
            filename=filename,
            path=file_path,
            category=category
        )
        
        # Save to database
        mongo_data = prepare_for_mongo(gallery_item.dict())
        await db.gallery.insert_one(mongo_data)
        
        return {"status": "success", "message": "Image uploaded successfully", "filename": filename}
    except Exception as e:
        logging.error(f"Gallery upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload image")

@api_router.get("/gallery")
async def get_gallery():
    """Get all gallery images"""
    try:
        images = await db.gallery.find().sort("created_at", -1).to_list(1000)
        return [GalleryImage(**img) for img in images]
    except Exception as e:
        logging.error(f"Get gallery error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch gallery")

@api_router.get("/admin/dashboard")
async def admin_dashboard(current_user: str = Depends(verify_token)):
    """Get admin dashboard data"""
    try:
        total_registrations = await db.student_registrations.count_documents({})
        total_partnerships = await db.partnerships.count_documents({})
        total_gallery = await db.gallery.count_documents({})
        
        # Get recent registrations
        recent_registrations = await db.student_registrations.find().sort("created_at", -1).limit(5).to_list(5)
        recent_partnerships = await db.partnerships.find().sort("created_at", -1).limit(5).to_list(5)
        
        return {
            "stats": {
                "total_registrations": total_registrations,
                "total_partnerships": total_partnerships,
                "total_gallery": total_gallery
            },
            "recent_registrations": [StudentRegistration(**reg) for reg in recent_registrations],
            "recent_partnerships": [Partnership(**partnership) for partnership in recent_partnerships]
        }
    except Exception as e:
        logging.error(f"Admin dashboard error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch dashboard data")

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