# Library Management System

A full-stack Library Management System built with React, Node.js, Express, and MongoDB.

## Features
- Admin Authentication
- Dashboard Statistics
- Book Management (CRUD + Search)
- Member Management (CRUD + Search)
- Issue/Return Book System
- Fine Calculation
- Responsive Design

## Prerequisites
- Node.js installed
- MongoDB installed and running locally (or Atlas)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in `backend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one is already provided) with your MongoDB URI.
4. Start the server: `node server.js`

### 2. Frontend Setup
1. Open a terminal in `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## How to Run
1. Ensure MongoDB is running.
2. Start the backend: `node server.js`.
3. Start the frontend: `npm run dev`.
4. Open the frontend URL (usually `http://localhost:5173`).
5. **Register a new account** on the registration page to get started.

## API Endpoints
- **Auth:** `POST /api/auth/login`, `POST /api/auth/register`
- **Books:** `GET /api/books`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id`
- **Members:** `GET /api/members`, `POST /api/members`, `PUT /api/members/:id`, `DELETE /api/members/:id`
- **Issues:** `GET /api/issues`, `POST /api/issues`, `PUT /api/issues/return/:id`
