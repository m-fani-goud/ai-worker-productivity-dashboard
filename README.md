AI-Powered Worker Productivity Dashboard

Overview

This project is a full-stack web application that ingests AI-generated worker activity events from CCTV computer vision systems and displays productivity metrics for a factory environment.

The system simulates a manufacturing setup with:

- 6 Workers
- 6 Workstations
- AI-generated activity events
- Productivity metrics dashboard

The application is containerized using Docker and can be run locally with a single command.

---

Architecture: Edge → Backend → Dashboard

1. Edge Layer (AI Cameras)

AI-powered CCTV cameras perform computer vision inference at the edge and generate structured events such as:

- working
- idle
- absent
- product_count

These events are sent to the backend through REST APIs.

Example event:

{
  "timestamp": "2026-01-15T10:15:00Z",
  "worker_id": "W1",
  "workstation_id": "S3",
  "event_type": "working",
  "confidence": 0.93,
  "count": 1
}

---

2. Backend Layer

Responsibilities:

- Event ingestion API
- Database storage (SQLite using Prisma ORM)
- Productivity metric computation
- Dummy data seeding
- APIs for dashboard

Tech Stack:

- Node.js
- Express.js
- Prisma ORM
- SQLite

---

3. Dashboard Layer

Frontend displays:

- Factory-level summary
- Worker metrics
- Workstation metrics
- Filtering and visualization

Tech Stack:

- React
- Vite

---

Database Schema

Workers

- worker_id (Primary Key)
- name

Workstations

- workstation_id (Primary Key)
- name

Events

- id (Primary Key)
- timestamp
- worker_id (Foreign Key)
- workstation_id (Foreign Key)
- event_type
- confidence
- count

---

Metrics Definitions

Worker Metrics

- Active Time
  Time between consecutive "working" events.

- Idle Time
  Time between consecutive "idle" events.

- Utilization %

active_time / (active_time + idle_time) * 100

- Units Produced
  Sum of count from product_count events.

- Units per Hour

units / active_hours

---

Workstation Metrics

- Occupancy Time
- Utilization Percentage
- Total Units Produced
- Throughput Rate

---

Factory Metrics

- Total productive time
- Total production count
- Average utilization across workers
- Average production rate

---

Assumptions

- Events are sorted by timestamp before metric calculations.
- Duration is computed using time difference between consecutive events.
- product_count events contribute only to production metrics.
- Confidence values are stored but not filtered in current version.

---

Handling Real-World Challenges

Intermittent Connectivity

- Edge devices can buffer events locally.
- Backend APIs are idempotent.
- Retry mechanisms can be implemented using message queues (Kafka / MQTT).

Duplicate Events

- Can be handled using unique event IDs or hashing.
- Future improvement: deduplication layer before DB insert.

Out-of-Order Timestamps

- Events are sorted before metric computation.

---

Model Versioning

Each event can include:

- model_version
- camera_id

This enables tracking which AI model generated the event.

---

Model Drift Detection

Possible approaches:

- Monitor confidence score distribution over time
- Compare predicted production vs actual output
- Statistical anomaly detection

---

Retraining Strategy

Retraining can be triggered when:

- Accuracy drops below threshold
- Drift detected
- New labeled data available

---

Scalability Strategy

Scaling Cameras (5 → 100+)

- Introduce message queue (Kafka / RabbitMQ)
- Stream processing pipeline
- Horizontal backend scaling
- Load balancing

Multi-Site Deployment

- Add site_id dimension
- Use cloud database (PostgreSQL)
- Microservices architecture
- Central monitoring dashboard

---

Running Locally with Docker

Requirements

- Docker Desktop

Run Application

docker compose up --build

Frontend:

http://localhost:3000

Backend:

http://localhost:4000

---

Tradeoffs

- SQLite chosen for simplicity instead of production DB.
- Metrics computed on request instead of pre-aggregation.
- Minimal UI for faster development.
- No authentication layer included.

---

Future Improvements

- Real-time streaming with WebSockets
- Authentication & authorization
- Historical analytics
- Alerting system
- Predictive analytics using ML

---

Author

AI Worker Productivity Dashboard — Technical Assessment