# 📦 File Management System – GitHub README

## 🧠 Overview
A robust file management platform with full support for nested folders, document versioning, and user authentication. It is built using Node.js and Express, designed using a scalable microservices architecture.

### 🔧 Services Breakdown
- **User Service** ➡️ Handles authentication and user profile.
- **Hierarchy Service** ➡️ Manages folders and nested folder logic.
- **Version Service** ➡️ Manages document versioning, uploads, and history.

> All services run under a unified NGINX gateway on **port 80**.

---

## 🏗️ Architecture

### 🧱 Pattern: MVC (Model-View-Controller)
Each microservice is structured as:
- **Models** – MongoDB schemas (Mongoose)
- **Controllers** – Handle HTTP route logic
- **Services** – Encapsulate business logic
- **Helpers** – Utility and reusable logic

### 🔀 Microservices Routing via NGINX
NGINX reverse proxies requests as:
- `/` → User Service
- `/hierarchy` → Hierarchy Service
- `/versions` → Version Service

### 🐳 Containerized Infrastructure
All services are Dockerized and managed using `docker-compose`.

```bash
# Spin up the environment
$ docker compose up --build -d
```

> 🌐 Access app at [http://localhost](http://localhost)

---

## ⚙️ Setup Instructions

1. **Clone the repo:**
```bash
git clone <your-repo-url>
cd file-management-system
```

2. **Start the services:**
```bash
docker compose up --build -d
```

3. **Verify:** Ensure port `80` is exposed and running

---

## 📁 Tech Stack

- **Runtime**: Node.js + Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT-based authentication
- **Validation**: `express-validator`
- **Rate Limiting**: `express-rate-limit`
- **File Uploads**: `multer`
- **Image Optimization**: WebP conversion
- **Centralized Error Handling**
- **REST APIs** (No message brokers used)

### 📂 File Upload Support:
```bash
Allowed Types: jpeg, jpg, png, gif, webp, pdf, txt, doc, docx, xlsx, csv
```

---

## ⚖️ Trade-Off Analysis

| Decision | ✅ Pros | ⚠️ Cons |
|---------|--------|--------|
| Microservices | Modular, independent scaling | More infra and deployment complexity |
| JWT Auth | Stateless, scalable | Manual invalidation required |
| No Message Broker | Simpler architecture | No support for async workflows |
| Local File Storage | Fast, simple | Poor scalability in prod |
| WebP Image Format | Lightweight, fast | Adds CPU conversion overhead |
| Centralized Errors | Uniform structure | Slight learning curve for debugging |

---

## 🚀 Features

- 🔐 Secure Auth with JWT
- 📁 Folder & Subfolder Management
- 📝 Document Creation & Editing
- 📄 File Uploads with Version Control
- 🔍 Search Documents by Title/Content
- 📊 API Rate Limiting
- 🧾 Version History Retention

---

## 📘 API Documentation

- Every API follows REST standards.
- Auth-protected routes require `x-auth-token` header.
- Full documentation available via Postman (JSON collection provided).

### 🧪 API Categories
- `POST /signup`, `POST /login` – Authentication
- `POST/PUT/DELETE /folders` – Folder management
- `POST/GET/PUT/DELETE /documents` – Document and version operations
- `GET /filter` – Document search

---

## 💬 Feedback & Contributions

- Found a bug? Open an [issue](../../issues)
- Want to improve? Submit a [pull request](../../pulls)
- Looking for help? Raise a discussion or reach out

---

🛠️ Made with **Node.js**, **MongoDB**, and ❤️ powered by **Docker** 🐳

