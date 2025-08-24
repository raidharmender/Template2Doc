# Docker Setup

This document outlines the steps to build and run the application using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Application

1.  **Build and Run the Containers:**

    Open a terminal in the root of the project and run the following command:

    ```bash
    docker-compose up --build
    ```

    This command will:
    - Build the Docker image for the frontend service.
    - Build the Docker image for the backend service.
    - Start containers for both services.

2.  **Accessing the Application:**

    - The **Frontend** will be accessible at [http://localhost:8080](http://localhost:8080).
    - The **Backend API** will be accessible at [http://localhost:8000](http://localhost:8000).

3.  **Stopping the Application:**

    To stop the running containers, press `Ctrl + C` in the terminal where `docker-compose up` is running.

    To stop and remove the containers, you can run:
    ```bash
    docker-compose down
    ```

## Services

This setup consists of two services:

### 1. `frontend`

-   **Dockerfile:** `/<PROJECT_ROOT>/Dockerfile`
-   **Description:** A React application built with Vite and served by Nginx.
-   **Host Port:** `8080`

### 2. `backend`

-   **Dockerfile:** `/backend/Dockerfile`
-   **Description:** A FastAPI application that serves the API.
-   **Host Port:** `8000`

## Network

The services communicate with each other over a custom bridge network named `app-network`. The frontend's Nginx configuration is set up to proxy requests from `/api` to the `backend` service at `http://backend:8000`. 