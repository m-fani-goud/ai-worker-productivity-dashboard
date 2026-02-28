# AI-Powered Worker Productivity Dashboard

## Overview

The AI-Powered Worker Productivity Dashboard is a full-stack web application that simulates how AI-enabled CCTV systems monitor worker activity and generate productivity insights in a manufacturing environment.

The system ingests structured events produced by computer vision models (e.g., working, idle, absent, product_count) and computes actionable metrics at the worker, workstation, and factory levels.

The application is containerized using Docker and can be run locally with a single command.

---

## Features

- AI activity event ingestion API
- Worker productivity metrics calculation
- Workstation utilization metrics
- Factory-level summary dashboard
- Dummy data simulation
- RESTful backend architecture
- Modern React frontend (Vite)
- Dockerized full-stack setup

---

## System Architecture

AI Cameras (Edge Layer)  
↓  
Backend API (Node.js + Express + Prisma)  
↓  
Database (SQLite)  
↓  
Frontend Dashboard (React + Vite)

---

## AI Event Simulation

AI-powered CCTV cameras generate structured events such as:

- working
- idle
- absent
- product_count

Example event:

```json
{
  "timestamp": "2026-01-15T10:15:00Z",
  "worker_id": "W1",
  "workstation_id": "S3",
  "event_type": "working",
  "confidence": 0.93,
  "count": 1
}
```

---

## Tech Stack

### Backend

- Node.js
- Express.js
- Prisma ORM
- SQLite

### Frontend

- React
- Vite
- Axios

### DevOps

- Docker
- Docker Compose

---

## Database Schema

### Workers

- worker_id (Primary Key)
- name

### Workstations

- workstation_id (Primary Key)
- name

### Events

- id (Primary Key)
- timestamp
- worker_id (Foreign Key)
- workstation_id (Foreign Key)
- event_type
- confidence
- count

---

## Metrics Definitions

### Worker Metrics

- Active Time — Time spent in working state
- Idle Time — Time spent idle
- Utilization %

```
active_time / (active_time + idle_time) * 100
```

- Units Produced — Sum of product_count events
- Units per Hour

```
units / active_hours
```

---

### Workstation Metrics

- Occupancy Time
- Utilization Percentage
- Total Units Produced
- Throughput Rate

---

### Factory Metrics

- Total productive time
- Total production count
- Average utilization
- Average production rate

---

## Running Locally with Docker

### Prerequisites

- Docker Desktop installed

### Run Application

```bash
docker compose up --build
```

---

## Access Application

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:4000
```

---

## Project Structure

```
TechnicalAssessment/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── prisma/
│   ├── index.js
│   └── Dockerfile
│
│── frontend/
│   ├── src/
│   └── Dockerfile
│
│── docker-compose.yml
│── README.md
```

---

## Handling Real-World Challenges

### Intermittent Connectivity

- Edge devices buffer events locally
- Backend APIs are idempotent
- Retry possible via queues (Kafka / MQTT)

### Duplicate Events

- Can be solved using unique event IDs
- Future improvement: deduplication layer

### Out-of-Order Events

- Events sorted before metric computation

---

## Scalability Strategy

### Scaling Cameras (5 → 100+)

- Introduce message queue (Kafka / RabbitMQ)
- Stream processing pipeline
- Horizontal backend scaling
- Load balancing

### Multi-Site Deployment

- Add site_id dimension
- Cloud database (PostgreSQL)
- Microservices architecture
- Central monitoring dashboard

---

## Tradeoffs

- SQLite used for simplicity instead of production DB
- Metrics computed on request instead of pre-aggregation
- Minimal UI to focus on core functionality
- No authentication layer included

---

## Future Improvements

- Real-time streaming using WebSockets
- Authentication & authorization
- Historical analytics dashboards
- Alerting & anomaly detection
- Predictive analytics using ML models

---

## Author

Technical Assessment Submission  
AI Worker Productivity Dashboard
