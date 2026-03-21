# Doc-connect - Online Doctor Appointment Booking App

## 🧠 Idea Overview

- Doc-connect is a web application that simplifies the process of scheduling doctor appointments. Patients can explore a list of verified doctors, filter them by specialization, check availability, and book appointments directly from the platform.

- Doctors, on the other hand, get access to a secure admin dashboard where they can manage their available slots, upcoming appointments, and patient interactions.

## 🛠️ Tech Stack

### 🌐 Frontend

- **Frontend**: React.js
- **Styling**: Tailwind CSS / ShadCN UI
- **State Management**: Context API or Redux (optional)

### 🗄️ Backend

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Calendar Integration**: React Big Calendar

### 🔐 Auth APIs

- **POST** /api/auth/user/register
- **POST** /api/auth/user/login
- **POST** /api/auth/doctor/register
- **POST** /api/auth/doctor/login

### 🧑‍⚕️ Doctor APIs

- **GET** /api/doctors → list doctors
- **GET** /api/doctors/:id → doctor details

### 📅 Appointment APIs

- **POST** /api/appointments → create booking
- **GET** /api/appointments → user bookings
- **PATCH** /api/appointments/:id/accept → doctor accepts
- **PATCH** /api/appointments/:id/reject → doctor rejects
