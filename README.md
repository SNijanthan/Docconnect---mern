# 🩺 DocConnect – Online Doctor Appointment Booking App

## 🧠 Overview

**DocConnect** is a full-stack web application that enables users to seamlessly book doctor appointments online.

- 👤 Patients can browse doctors, filter by specialization, and book appointments.
- 👨‍⚕️ Doctors can manage appointments, accept/reject requests, and track schedules.

---

## ⚙️ Tech Stack

### 🌐 Frontend

- React.js (Vite)
- Tailwind CSS / Chakra UI
- React Router
- Axios

### 🗄️ Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 🏗️ Project Structure

```
doc-connect/
  client/   → Frontend (React)
  server/   → Backend (Node + Express)
```

---

## 🚀 API Endpoints

### 🔐 Auth APIs

- POST `/api/auth/user/register` → Register user ✅
- POST `/api/auth/user/login` → User login ✅
- POST `/api/auth/doctor/register` → Register doctor ✅
- POST `/api/auth/doctor/login` → Doctor login ✅
- POST `/api/auth/logout` → Logout ✅

---

### 🧑‍⚕️ Doctor APIs

- GET `/api/doctors` → Get all doctors ✅
- GET `/api/doctors/:id` → Get doctor details ✅

---

### 📅 Appointment APIs

#### 👤 User

- POST `/api/appointments` → Create appointment
- GET `/api/appointments/user` → Get user bookings
- PATCH `/api/appointments/:id/cancel` → Cancel appointment

#### 👨‍⚕️ Doctor

- GET `/api/appointments/doctor` → Get doctor bookings
- PATCH `/api/appointments/:id/accept` → Accept appointment
- PATCH `/api/appointments/:id/reject` → Reject appointment
- PATCH `/api/appointments/:id/complete` → Complete appointment

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in cookies / Authorization header
- Role-based access (User / Doctor)

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/doc-connect.git
cd doc-connect
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm start
```

Create `.env` in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET_KEY=your_secret
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

Create `.env` in `client/`:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧠 Features

- 🔐 Role-based authentication (User & Doctor)
- 📅 Appointment booking system
- 👨‍⚕️ Doctor availability & management
- ❌ Cancel / Accept / Reject / Complete flows
- 🔄 Clean API architecture

---

## 🚧 Status

- Backend: 🚧 In Progress
- Frontend: 🚧 In Progress

---

## 📌 Future Improvements

- Payment integration
- Notifications (Email/SMS)
- Doctor ratings & reviews
- Real-time availability

---

## 🤝 Contributing

Feel free to fork and contribute to improve this project.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

<!-- Niju@123 Password for user -->
<!-- Hello@123 Password for doctor -->
<!-- ✅ Completed -->
