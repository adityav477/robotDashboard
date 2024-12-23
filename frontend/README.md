# Robot Dashboard

Robot Dashboard is a full-stack application for managing and monitoring robots. The backend is built using Python with FastAPI, while the frontend is a Next.js application. This project provides WebSocket updates for real-time robot monitoring.

## Features

- **Frontend**: Developed using Next.js for a responsive and interactive UI.
- **Backend**: Built with FastAPI, providing REST APIs and WebSocket support.
- **WebSocket Updates**: Real-time updates on robot statuses and metrics.
- **Dockerized Deployment**: Easy setup with Docker Compose.

## Visit The app

 Deployment ->  <https://robot-dashboard-gray.vercel.app/>

---

## Project Structure

project-root/
├── backend
│   ├── Dockerfile
│   ├── **pycache**
│   ├── data
│   ├── main.py
│   └── requirements.txt
├── docker-compose.yml
└── frontend
    ├── Dockerfile
    ├── README.md
    ├── components.json
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── src
    ├── tailwind.config.ts
    └── tsconfig.json

## How to Start locally

Get the project locally started

### Without Docker

To run using Docker-compose or docker build

1. Cone the repo <http://github.com/adityav477/robotDashboard> on your local machine using git

   ```sh
    git clone <https://github.com/adityav477/robotDashboard>
   ````

2. Go to `robotDashboard/backend`

   ```sh
     cd robotDashboard/backend
   ```

3. Install requirements

   ```sh
   pip install -r requirements.txt
   ```

4. Start `Backend`

   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

5. Go to `robotDashboard/frontend`

   ```sh  
   cd robotDashboard/frontend
   ```

6. Install Packages

   ```sh
   npm install 
   ```

7. Set Up your .env file
   - Duplicate `.env.example` to `.env` in `/frontend`
   - use `NEXt_PUBLIC_BACKEND_WS_URL="ws://localhost:8000"` for local development

8. Run the app
   - npm run dev

9. Access the app
   - Frontend: <http://localhost:3000>
   - Backend: <http://localhost:8000>

## Docker Build

### Prerequisites

- Docker
- Docker-compose

In the root of Folder start the apps with docker compose command

   ```$
   docker compose up 
   ```
