import os
import uuid

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"
TOKEN = "hoc_admin_7f4c1e9a2b6d48f0ab35c1d9e2f8a640"
AUTH = {"Authorization": f"Bearer {TOKEN}"}


def ip_headers():
    """Unique fake client IP per request so the 5/IP/hr limiter doesn't skew tests."""
    return {"X-Forwarded-For": f"10.{uuid.uuid4().int % 250}.{uuid.uuid4().int % 250}.{uuid.uuid4().int % 250}"}


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---- health ----
class TestHealth:
    def test_root(self, s):
        r = s.get(f"{API}/")
        assert r.status_code == 200, r.text
        assert r.json() == {"service": "House of Chirmi", "ok": True}


# ---- enquiry ----
class TestEnquiry:
    def test_create_and_persist(self, s):
        payload = {
            "name": "TEST_Qa Tester",
            "email": "qa.tester@example.com",
            "brand": "TEST_Brand",
            "link": "https://example.com",
            "need": "New storefront",
            "budget": "1-2L",
            "message": "TEST_message body",
            "source_page": "/contact",
            "company": "",
        }
        r = s.post(f"{API}/enquiry", json=payload, headers=ip_headers())
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        eid = data["id"]

        g = s.get(f"{API}/enquiry", headers=AUTH)
        assert g.status_code == 200, g.text
        rows = g.json()
        assert isinstance(rows, list) and len(rows) > 0
        assert all("_id" not in row for row in rows)
        row = next((x for x in rows if x["id"] == eid), None)
        assert row is not None, "created enquiry not retrievable"
        assert row["name"] == "TEST_Qa Tester"
        assert row["email"] == "qa.tester@example.com"
        assert row["budget"] == "1-2L"
        assert row["need"] == "New storefront"
        assert row["source_page"] == "/contact"
        # newest-first ordering
        created = [x["created_at"] for x in rows]
        assert created == sorted(created, reverse=True), "not newest-first"

    def test_invalid_email_422(self, s):
        r = s.post(f"{API}/enquiry", json={"name": "TEST_x", "email": "not-an-email"}, headers=ip_headers())
        assert r.status_code == 422, r.text

    def test_missing_name_422(self, s):
        r = s.post(f"{API}/enquiry", json={"name": "   ", "email": "a@example.com"}, headers=ip_headers())
        assert r.status_code == 422, r.text

    def test_honeypot_stores_nothing(self, s):
        before = len(s.get(f"{API}/enquiry", headers=AUTH).json())
        r = s.post(
            f"{API}/enquiry",
            json={"name": "TEST_spam", "email": "spam@example.com", "company": "spam"},
            headers=ip_headers(),
        )
        assert r.status_code == 200, r.text
        assert r.json() == {"ok": True, "id": None}
        after = len(s.get(f"{API}/enquiry", headers=AUTH).json())
        assert after == before, "honeypot submission was stored"

    def test_list_unauthenticated_401(self, s):
        r = s.get(f"{API}/enquiry")
        assert r.status_code == 401, r.text

    def test_list_bad_token_401(self, s):
        r = s.get(f"{API}/enquiry", headers={"Authorization": "Bearer wrong"})
        assert r.status_code == 401, r.text


# ---- creator ----
class TestCreator:
    def test_create_and_persist(self, s):
        payload = {
            "name": "TEST_Creator",
            "handle": "@test_creator",
            "city": "Bengaluru",
            "categories": ["bridal", "jewellery"],
            "sample_1": "https://example.com/1",
            "sample_2": "https://example.com/2",
        }
        r = s.post(f"{API}/creator", json=payload, headers=ip_headers())
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True and isinstance(data["id"], str)
        cid = data["id"]

        g = s.get(f"{API}/creator", headers=AUTH)
        assert g.status_code == 200, g.text
        rows = g.json()
        assert all("_id" not in row for row in rows)
        row = next((x for x in rows if x["id"] == cid), None)
        assert row is not None
        assert row["handle"] == "@test_creator"
        assert row["categories"] == ["bridal", "jewellery"]
        assert row["city"] == "Bengaluru"

    def test_missing_handle_422(self, s):
        r = s.post(f"{API}/creator", json={"name": "TEST_c"}, headers=ip_headers())
        assert r.status_code == 422, r.text

    def test_honeypot(self, s):
        before = len(s.get(f"{API}/creator", headers=AUTH).json())
        r = s.post(
            f"{API}/creator",
            json={"name": "TEST_s", "handle": "@s", "company": "spam"},
            headers=ip_headers(),
        )
        assert r.status_code == 200 and r.json()["id"] is None
        after = len(s.get(f"{API}/creator", headers=AUTH).json())
        assert after == before

    def test_list_unauthenticated_401(self, s):
        r = s.get(f"{API}/creator")
        assert r.status_code == 401, r.text


# ---- rate limit ----
class TestRateLimit:
    def test_sixth_post_429(self, s):
        headers = ip_headers()
        codes = []
        for i in range(6):
            r = s.post(
                f"{API}/enquiry",
                json={"name": f"TEST_rl{i}", "email": f"rl{i}@example.com", "message": "TEST_rate"},
                headers=headers,
            )
            codes.append(r.status_code)
        assert codes[:5] == [200] * 5, codes
        assert codes[5] == 429, codes
