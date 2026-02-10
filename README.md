# SOC Alert System

A full-stack Threat Detection and Response dashboard.

## Prerequisites

- **Java**: JDK 17 or higher
- **Maven**: 3.6 or higher
- **Node.js**: 16 or higher
- **MySQL**: 8.0 (Ensure service is running)

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (Workbench, CLI, etc.).
2. Create the database:
   ```sql
   CREATE DATABASE soc_alert_db;
   ```
3. Update the database credentials in `src/main/resources/application.properties` if they differ from `root/root`.

### 2. Backend Setup
1. Open a terminal in the root directory (`soc_alert_backend`).
2. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```
   *Note: On the first run, the application will automatically populate the database with sample data (`data.sql`).*
3. The backend API will start at `http://localhost:8080`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard at `http://localhost:5173`.

## API Documentation

A Postman collection is included in this repository: `SOC_Alert_System.postman_collection.json`.

### Key Endpoints
- **GET** `/api/alerts` - Retrieve all alerts
- **GET** `/api/alerts/{id}` - Retrieve details for a specific alert
- **POST** `/api/alerts` - Ingest a new alert (JSON payload)
- **POST** `/api/alerts/{id}/investigate` - Add investigation notes
