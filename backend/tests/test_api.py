import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_offer_letter():
    payload = {"data": {"fullName": "Test User", "emailAddress": "test@example.com"}}
    response = client.post("/api/offer-letter", json=payload)
    assert response.status_code == 200
    assert "id" in response.json()
    return response.json()["id"]

def test_get_offer_letter():
    payload = {"data": {"fullName": "Test User", "emailAddress": "test@example.com"}}
    post_resp = client.post("/api/offer-letter", json=payload)
    oid = post_resp.json()["id"]
    get_resp = client.get(f"/api/offer-letter/{oid}")
    assert get_resp.status_code == 200
    assert get_resp.json()["data"]["fullName"] == "Test User"

def test_docx_generation():
    payload = {"data": {"fullName": "Test User", "emailAddress": "test@example.com"}}
    post_resp = client.post("/api/offer-letter", json=payload)
    oid = post_resp.json()["id"]
    docx_resp = client.get(f"/api/offer-letter/{oid}/docx")
    assert docx_resp.status_code == 200
    assert docx_resp.headers["content-type"].startswith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")

def test_pdf_generation():
    payload = {"data": {"fullName": "Test User", "emailAddress": "test@example.com"}}
    post_resp = client.post("/api/offer-letter", json=payload)
    oid = post_resp.json()["id"]
    pdf_resp = client.get(f"/api/offer-letter/{oid}/pdf")
    assert pdf_resp.status_code == 200
    assert pdf_resp.headers["content-type"].startswith("application/pdf") 