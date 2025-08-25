# Offer Letter Generation Application

This application consists of a React frontend and FastAPI backend for generating offer letters using Word templates and converting them to PDF.

## Project Structure

```
├── frontend/           # React frontend application
├── backend/            # FastAPI backend application
├── docker-compose.yml  # Docker orchestration
├── offer_letters/      # Generated PDF files
└── README.md
```

## Features

- **Frontend**: React application with TypeScript and Tailwind CSS
- **Backend**: FastAPI Python backend with MongoDB integration
- **Document Generation**: Uses Word templates to generate offer letters
- **PDF Conversion**: Converts generated Word documents to PDF
- **Docker Support**: Both applications are containerized
- **Health Checks**: Built-in health monitoring for both services

## Prerequisites

- Docker and Docker Compose installed
- Python 3.10+ (for local development)
- Node.js 18+ (for local development)

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Vikram_POC_1
   ```

2. **Build and start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Backend Health: http://localhost:8000/health

4. **Stop the application**
   ```bash
   docker-compose down
   ```

## Testing the Application

Run the test script to verify both applications are working:

```bash
python test_applications.py
```

## Local Development

### Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   ## Go to the backend directory and run the application
   cd backend/ &&  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Backend API

- `GET /health` - Health check endpoint
- `POST /api/offer-letter` - Create a new offer letter
- `GET /api/offer-letter/{id}` - Get offer letter by ID
- `GET /api/offer-letter/all` - Get all offer letters
- `DELETE /api/offer-letter/{id}` - Delete offer letter
- `GET /api/offer-letter/{id}/docx` - Download DOCX file
- `GET /api/offer-letter/{id}/pdf` - Download PDF file

## Template Configuration

The backend uses `backend/app/OfferLetterFinal.docx` as the template for generating offer letters. All generated PDFs are saved in the `offer_letters/` folder with the naming convention:

```
Offer_Letter_{CandidateName}_{Date}.pdf
```

## Docker Configuration

### Frontend Container
- Base: Node.js 18 Alpine
- Build: Multi-stage build with nginx
- Port: 3000 (mapped to container port 80)
- Health check: `/health` endpoint

### Backend Container
- Base: Python 3.10-slim
- Port: 8000
- Health check: `/health` endpoint
- Volumes: `offer_letters` folder for generated files

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 8000 are available
2. **Template not found**: Verify `OfferLetterFinal.docx` exists in `backend/app/`
3. **Permission issues**: Check Docker volume permissions for `offer_letters` folder

### Logs

View container logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
```

### Health Checks

Both services include health check endpoints:
- Frontend: http://localhost:3000/health
- Backend: http://localhost:8000/health

## Development Notes

- The frontend is built using Vite and React with TypeScript
- The backend uses FastAPI with MongoDB integration
- Document generation uses `python-docx` and `docx2pdf` libraries
- All generated files are stored in the `offer_letters` folder
- The application supports conditional field rendering based on CSV mappings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Kubernetes (Minikube) Deployment

This project is fully containerized with separate images for the frontend (React + Nginx) and backend (FastAPI). Use the provided Kubernetes manifests to run everything on Minikube, including MongoDB and persistent volumes.

Prerequisites
- Minikube
- kubectl
- Docker (so you can build images into Minikube's Docker daemon)

Steps
1) Start Minikube and use its Docker daemon
   - macOS/Linux (bash/zsh):
     eval $(minikube docker-env)
   - Windows PowerShell:
     & minikube -p minikube docker-env | Invoke-Expression

2) Build Docker images inside Minikube
   docker build -t offerletter-backend:latest backend
   docker build -t offerletter-frontend:latest frontend

3) Enable the NGINX ingress controller
   minikube addons enable ingress

4) Apply Kubernetes manifests
   kubectl apply -f k8s/manifest.yaml

5) Verify pods are running
   kubectl get pods

6) Access the app via Ingress
   - Get Minikube IP:
     MINIKUBE_IP=$(minikube ip)
   - Frontend:
     http://$MINIKUBE_IP/
   - Frontend health:
     http://$MINIKUBE_IP/health
   - Backend health:
     http://$MINIKUBE_IP/api/health

Notes
- The backend writes generated files to a PersistentVolume mounted at /app/offer_letters.
- MongoDB runs without authentication inside the cluster and uses a PersistentVolume for data.
- The frontend makes requests to relative paths under /api, which the Ingress routes to the backend Service.
- PDF conversion may not work in Linux containers due to OS dependencies of docx2pdf; in that case the service falls back to returning the DOCX.

Cleanup
- Remove resources:
  kubectl delete -f k8s/manifest.yaml
- Stop Minikube:
  minikube stop

## License

This project is licensed under the MIT License.
