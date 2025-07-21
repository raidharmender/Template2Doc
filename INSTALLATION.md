# Installation Guide: Offer Letter App (Frontend & Backend)

This guide covers all steps to set up and run the frontend (React/Vite) and backend (FastAPI/Python/MongoDB) on **macOS** and **RHEL (Red Hat Enterprise Linux)**.

---

## Prerequisites (Both OS)
- **Git** (for cloning the repo)
- **Python 3.10+** (for backend)
- **Node.js 18+ & npm** (for frontend)
- **MongoDB** (for backend data storage)

---

## 1. macOS Installation

### 1.1. Install Homebrew (if not already installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 1.2. Install Node.js, npm, Python, and MongoDB
```bash
brew install node python@3.10
brew tap mongodb/brew
brew install mongodb-community@7.0
```

### 1.3. Start MongoDB
```bash
brew services start mongodb/brew/mongodb-community@7.0
```

### 1.4. (Optional) Install MacPorts (for wkhtmltopdf, if needed)
```bash
# Only if you want to use wkhtmltopdf for other projects
# Not required for this app (uses reportlab for PDF)
```

---

## 2. RHEL Installation

### 2.1. Install Node.js, npm, Python, and MongoDB
```bash
# Enable EPEL and Software Collections for newer Node.js and Python
sudo yum install -y epel-release
sudo yum install -y gcc-c++ make

# Node.js (use NodeSource for latest LTS)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Python 3.10+
sudo yum install -y python3 python3-devel

# MongoDB (Community Edition)
# See: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/
cat <<EOF | sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
EOF
sudo yum install -y mongodb-org
```

### 2.2. Start MongoDB
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## 3. Backend Setup (Both OS)

### 3.1. Create and activate a Python virtual environment
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

### 3.2. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 3.3. Install system packages for PDF/Docx generation
- **macOS:** Already included with Homebrew Python
- **RHEL:**
  ```bash
  sudo yum install -y libjpeg-devel zlib-devel
  ```

---

## 4. Frontend Setup (Both OS)

### 4.1. Install Node.js dependencies
```bash
npm install
```

---

## 5. Running the App

### 5.1. Start Backend
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

### 5.2. Start Frontend
```bash
npm run dev
```

- The frontend will be available at the port shown in the terminal (default: http://localhost:5173 or http://localhost:8080)
- The backend API will be at http://localhost:8000

---

## 6. Troubleshooting
- If you see `sh: vite: command not found`, run `npm install` in the project root.
- If you see `ModuleNotFoundError: No module named 'reportlab'`, run `pip install reportlab` in your backend venv.
- If MongoDB fails to start, check logs with `brew services list` (macOS) or `sudo systemctl status mongod` (RHEL).

--- 