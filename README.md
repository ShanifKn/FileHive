📦 File Management System – Developer Documentation

🧠 Overview

This system is designed to manage folders, documents, and versions with authentication. Built with Node.js and Express, it uses a microservices architecture divided into:

User Service ➡️ Handles signup, login, profile

Hierarchy Service ➡️ Manages folders and folder relationships

Version Service ➡️ Manages document versions

All services are containerized using Docker and routed via NGINX on a single port (default: 80).

🏗️ Architecture

🧱 Architectural Pattern: MVC (Model-View-Controller)

Each microservice follows the MVC pattern:

Model: MongoDB schemas

Controllers: Route logic

Services: Business logic

Helpers: Utility functions

🌐 Microservices via NGINX

/ → User Service

/hierarchy → Hierarchy Service

/versions → Version Service

Routing is managed through an NGINX config proxying requests to the correct service container.

⚙️ Setup Instructions

# 1️⃣ Clone the repo
$ git clone <repo-url>

# 2️⃣ Navigate to the folder
$ cd file-management-system

# 3️⃣ Build and start all containers
$ docker compose up --build -d

📌 Make sure Docker and Docker Compose are installed on your machine.

The system will run on http://localhost.

📁 Tech Stack

Node.js with Express.js

MongoDB with Mongoose ODM

Authentication: JWT-based

Validation: express-validator

Rate Limiting: express-rate-limit

Error Handling: Centralized global handler

File Upload: multer with WebP image conversion

Allowed File Types:

/jpeg|jpg|png|gif|webp|pdf|txt|doc|docx|xlsx|csv/

⚖️ Trade-Off Analysis

Decision

Pros

Cons

Microservices

Separation of concerns, easier scalability

Added complexity in deployment & communication

JWT Auth

Stateless and scalable

Token invalidation is manual

Centralized Error Handler

Uniform error responses

Slight debugging indirection

No Message Broker (RabbitMQ/Kafka)

Simpler, REST-only

No async processing or retries

Local File Storage

Fast and easy for dev

Not ideal for production or scaling

WebP Conversion

Optimized performance

Requires CPU for conversion

🚀 Features

👤 User Authentication (JWT)

📂 Nested Folder Structure

📝 Document Upload & Editing

🧾 File Versioning with WebP conversion

🔍 Document Search by Title/Content

🧪 API Highlights

Each API has been documented with:

✅ Method, URL, and Description

📥 Request Body

📤 Success Response

❌ Error Responses

🔐 Headers (for private routes)
