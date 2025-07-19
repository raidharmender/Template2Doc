# Backend for Offer Letter App

This backend is built with FastAPI and MongoDB. It receives form data from the frontend, stores it as JSON, and provides endpoints to generate DOCX and PDF files from the data.

## Features
- Store offer letter form data in MongoDB
- Retrieve stored data by ID
- Generate DOCX and PDF files from stored data

## Tech Stack
- FastAPI
- MongoDB
- python-docx
- pdfkit + jinja2

## Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Set up MongoDB (local or cloud, e.g., MongoDB Atlas).
3. Configure the MongoDB URI in `app/database.py` or via environment variable.
4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints
- `POST /api/offer-letter` — Store form data
- `GET /api/offer-letter/{id}` — Retrieve data
- `GET /api/offer-letter/{id}/docx` — Download DOCX
- `GET /api/offer-letter/{id}/pdf` — Download PDF 

---

## MongoDB Setup

### Option 1: Local MongoDB
1. **Install MongoDB Community Edition**
   - [Download and install instructions](https://www.mongodb.com/try/download/community)
2. **Start MongoDB**
   - On macOS: `brew services start mongodb-community`
   - Or run: `mongod`
3. **Default connection URI:**
   - `mongodb://localhost:27017`

### Option 2: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new project and cluster.
3. Add a database user and set a password.
4. Add your IP address to the access list.
5. Get your connection string (e.g. `mongodb+srv://<user>:<password>@cluster0.mongodb.net/offerletterdb?retryWrites=true&w=majority`)

### Environment Variables
You can override the default MongoDB URI and database name by setting environment variables:
- `MONGO_URI` (default: `mongodb://localhost:27017`)
- `MONGO_DB` (default: `offerletterdb`)

Example (create a `.env` file or export in your shell):
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/offerletterdb
MONGO_DB=offerletterdb
```

--- 

---

## Testing the Backend

### Manual Test with curl
You can test the API with:
```bash
curl -X POST http://localhost:8000/api/offer-letter \
  -H 'Content-Type: application/json' \
  -d '{"data": {"fullName": "Test User", "emailAddress": "test@example.com"}}'
```

### Automated Tests
1. All test cases are in the `backend/tests/` folder.
2. Run tests with:
   ```bash
   pytest backend/tests/
   ``` 

---

## Troubleshooting & Advanced Setup

### 1. Test Import Error: No module named 'app'
If you see this error when running tests:
```
ModuleNotFoundError: No module named 'app'
```
**Solution:**
Run pytest with the backend directory as PYTHONPATH:
```bash
cd backend
PYTHONPATH=. pytest tests/
```

### 2. PDF Generation Error: No wkhtmltopdf executable found
If you see this error:
```
OSError: No wkhtmltopdf executable found: "b''"
```
**Solution:**
#### Option 1: Install via MacPorts
1. [Install MacPorts](https://www.macports.org/install.php) if not already installed.
2. Run:
   ```bash
   sudo port install wkhtmltopdf
   ```
3. Confirm installation:
   ```bash
   which wkhtmltopdf
   wkhtmltopdf --version
   ```

#### Option 2: Download Official Installer
1. Go to [wkhtmltopdf downloads](https://wkhtmltopdf.org/downloads.html).
2. Download the latest macOS 64-bit `.pkg` installer.
3. Install by double-clicking the `.pkg` file.
4. Confirm installation as above.

#### Option 3: Apple Silicon (M1/M2/M3) with Rosetta
- Install Rosetta:
  ```bash
  softwareupdate --install-rosetta --agree-to-license
  ```
- Download and install the Intel `.pkg` as above.
- Optionally, run Terminal under Rosetta for compatibility.

--- 