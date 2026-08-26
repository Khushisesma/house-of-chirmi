from fastapi import FastAPI, APIRouter, Request, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import ssl
import smtplib
import logging
import uuid
from pathlib import Path
from email.message import EmailMessage
from datetime import datetime, timezone
from collections import defaultdict, deque
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator
from email_validator import validate_email, EmailNotValidError

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("chirmi")

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="House of Chirmi")
api_router = APIRouter(prefix="/api")

NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'khushisesma25@gmail.com')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', '')

# ---- In-memory rate limit: 5 posts / IP / hour ----
_hits = defaultdict(deque)
RATE_LIMIT = 5
RATE_WINDOW = 3600


def client_ip(request: Request) -> str:
    fwd = request.headers.get('x-forwarded-for')
    if fwd:
        return fwd.split(',')[0].strip()
    return request.client.host if request.client else 'unknown'


def check_rate(ip: str):
    now = datetime.now(timezone.utc).timestamp()
    q = _hits[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    q.append(now)


def send_notification(subject: str, body: str):
    host = os.environ.get('SMTP_HOST')
    if not host:
        logger.info("SMTP not configured; skipping email. Subject: %s", subject)
        return
    try:
        port = int(os.environ.get('SMTP_PORT', '587'))
        user = os.environ.get('SMTP_USER')
        password = os.environ.get('SMTP_PASS')
        sender = os.environ.get('SMTP_FROM', user or NOTIFY_EMAIL)
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = NOTIFY_EMAIL
        msg.set_content(body)
        with smtplib.SMTP(host, port, timeout=10) as server:
            server.starttls(context=ssl.create_default_context())
            if user and password:
                server.login(user, password)
            server.send_message(msg)
        logger.info("Notification email sent: %s", subject)
    except Exception as e:  # a missing/broken mailer must not lose the enquiry
        logger.error("Failed to send notification email: %s", e)


# ---- Models ----
class Enquiry(BaseModel):
    name: str
    email: str
    brand: str = ""
    link: str = ""
    need: str = ""
    budget: str = ""
    message: str = ""
    source_page: str = ""
    company: str = ""  # honeypot

    @field_validator('name')
    @classmethod
    def name_required(cls, v):
        if not v or not v.strip():
            raise ValueError('Name is required')
        return v.strip()


class Creator(BaseModel):
    name: str
    handle: str
    city: str = ""
    categories: List[str] = Field(default_factory=list)
    sample_1: str = ""
    sample_2: str = ""
    company: str = ""  # honeypot

    @field_validator('name', 'handle')
    @classmethod
    def required(cls, v):
        if not v or not v.strip():
            raise ValueError('This field is required')
        return v.strip()


def require_admin(authorization: Optional[str]):
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=503, detail="Admin access not configured")
    if authorization != f"Bearer {ADMIN_TOKEN}":
        raise HTTPException(status_code=401, detail="Unauthorized")


@api_router.get("/")
async def root():
    return {"service": "House of Chirmi", "ok": True}


@api_router.post("/enquiry")
async def create_enquiry(payload: Enquiry, request: Request):
    if payload.company.strip():  # honeypot filled -> pretend success, store nothing
        return {"ok": True, "id": None}
    check_rate(client_ip(request))
    try:
        validate_email(payload.email, check_deliverability=False)
    except EmailNotValidError:
        raise HTTPException(status_code=422, detail="Please enter a valid email address")

    doc = payload.model_dump()
    doc.pop('company', None)
    doc['id'] = str(uuid.uuid4())
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.enquiries.insert_one(doc)

    send_notification(
        f"New enquiry — {doc.get('name')}",
        f"Name: {doc.get('name')}\nEmail: {doc.get('email')}\nBrand: {doc.get('brand')}\n"
        f"Link: {doc.get('link')}\nNeed: {doc.get('need')}\nBudget: {doc.get('budget')}\n"
        f"Source: {doc.get('source_page')}\n\n{doc.get('message')}",
    )
    return {"ok": True, "id": doc['id']}


@api_router.post("/creator")
async def create_creator(payload: Creator, request: Request):
    if payload.company.strip():
        return {"ok": True, "id": None}
    check_rate(client_ip(request))

    doc = payload.model_dump()
    doc.pop('company', None)
    doc['id'] = str(uuid.uuid4())
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.creators.insert_one(doc)

    send_notification(
        f"New creator application — {doc.get('name')}",
        f"Name: {doc.get('name')}\nHandle: {doc.get('handle')}\nCity: {doc.get('city')}\n"
        f"Categories: {', '.join(doc.get('categories', []))}\n"
        f"Sample 1: {doc.get('sample_1')}\nSample 2: {doc.get('sample_2')}",
    )
    return {"ok": True, "id": doc['id']}


@api_router.get("/enquiry")
async def list_enquiries(authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    rows = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return rows


@api_router.get("/creator")
async def list_creators(authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    rows = await db.creators.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in os.environ.get('CORS_ORIGINS', '*').split(',') if o.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
