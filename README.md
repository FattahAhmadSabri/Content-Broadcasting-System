# 📚 Content Broadcasting System (Backend)

A scalable backend system for managing and broadcasting educational content with role-based access, scheduling, and rotation logic.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Sequelize ORM**
* **JWT Authentication**
* **Multer (File Upload)**
* **Express Rate Limiting**

---

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "express-rate-limit": "^8.4.1",
  "jsonwebtoken": "^9.0.3",
  "multer": "^2.1.1",
  "pg": "^8.20.0",
  "pg-hstore": "^2.3.4",
  "sequelize": "^6.37.8",
  "sequelize-cli": "^6.6.5",
  "validator": "^13.15.35"
}
```

---

## 📂 Project Structure

```
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
```

---

## 🔐 Core Modules

* **Auth Module** – Signup/Login with JWT
* **User Module** – Roles (Principal / Teacher)
* **Content Module** – Upload & manage content
* **Upload Module** – File handling via Multer
* **Approval Module** – Approve/Reject content
* **Scheduling Module** – Rotation-based scheduling

---

## 🗄️ Database Design

### Content Table

* id
* title
* subject
* file_url
* uploaded_by
* status (pending / approved / rejected)

### Content Slots

* id
* subject
* created_at

### Content Schedule

* id
* content_id (FK)
* slot_id (FK)
* rotation_order
* duration (minutes)

---

## 🔄 Broadcasting Logic

* Each **subject has its own slot**
* Each slot contains multiple contents via **schedule**
* Rotation is based on:

  * `rotation_order`
  * `duration`

### Example

```
Maths:
A → 5 min
B → 5 min
C → 5 min
→ Loop 🔁
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/signup`
* `POST /api/login`

### Content

* `POST /api/content`
* `GET /api/content`


### Slots

* `POST /api/slot`
* `GET /api/slot`
* `GET /api/slot/:subject`

### Schedule

* `POST /api/schedule`

### Broadcast

* `GET /api/content/live/:teacherId`

---

## 📡 Live Broadcast API

Returns currently active content based on rotation logic.

```http
GET /api/content/live/:teacherId
```

### Response

```json
{
  "status": "success",
  "data": [
    {
      "subject": "maths",
      "content": {
        "title": "Algebra Basics"
      }
    }
  ]
}
```

---

## Security Features

* Password hashing using **bcrypt**
* JWT-based authentication
* Role-based access control
* Rate limiting for login API

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env` file:

```
PORT=4000
DB_NAME=your_db
DB_USER=your_user
DB_PASS=your_password
JWT_SECRET=your_secret
```

### 3. Run migrations

```bash
npx sequelize-cli db:migrate
```

### 4. Start server

```bash
nodemon server.js
```

---

## Key Concepts

* Slot is created **once per subject**
* Content must be **approved before scheduling**
* Schedule connects **content → slot**
* Broadcast is **calculated dynamically (no cron needed)**

---



 Author

Fattah Ahmad Sabri
Backend Developer (Node.js | Express | PostgreSQL)

---
