# Offer Letter App

This project provides a full-stack solution for generating, storing, and managing offer letters using a React (Vite) frontend and a FastAPI/Python backend with MongoDB.

---

## Features
- Fill out and submit offer letter forms
- Store and manage offer letters in MongoDB
- Download offer letters as PDF or DOCX
- Admin portal to view, search, and delete all offer letters

---

## API Endpoints (Backend)
- `POST /api/offer-letter` — Store form data
- `GET /api/offer-letter/{id}` — Retrieve data
- `GET /api/offer-letter/{id}/pdf` — Download PDF
- `GET /api/offer-letter/{id}/docx` — Download DOCX
- `GET /api/offer-letter/all` — List all offer letters
- `DELETE /api/offer-letter/{id}` — Delete an offer letter

---

## Usage
- Start the backend and frontend as described in INSTALLATION.md
- Access the main form at `/`
- Access the admin portal at `/portal`

---

## Log File Locations

### Backend (FastAPI)
- Logs are printed to the terminal where you run `uvicorn app.main:app --reload`.
- To save logs to a file, run:
  ```bash
  uvicorn app.main:app --reload > backend.log 2>&1
  ```
  The log file will be at `backend/backend.log` (if you run from the backend directory).

### Frontend (Vite/React)
- Logs are printed to the terminal where you run `npm run dev`.
- Browser errors and network requests can be viewed in the browser's Developer Tools (Console and Network tabs).
- To save frontend logs, redirect output:
  ```bash
  npm run dev > frontend.log 2>&1
  ```
  The log file will be at `frontend.log` in your project root.

---

## Troubleshooting

### Backend: ModuleNotFoundError: No module named 'app'
If you see this error when running the backend:

```
ModuleNotFoundError: No module named 'app'
```

**Solution:**
- Change to the backend directory before running uvicorn:
  ```bash
  cd backend
  uvicorn app.main:app --reload
  ```
- Or, from the project root, set the PYTHONPATH:
  ```bash
  PYTHONPATH=backend uvicorn app.main:app --reload
  ```

This ensures Python can find the `app` module and the backend will start correctly.
