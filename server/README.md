# Doc-connect - Online Doctor Appointment Booking App

## 🧠 Idea Overview

- Doc-connect is a web application that simplifies the process of scheduling doctor appointments. Patients can explore a list of verified doctors, filter them by specialization, check availability, and book appointments directly from the platform.

- Doctors, on the other hand, get access to a secure admin dashboard where they can manage their available slots, upcoming appointments, and patient interactions.

## 🛠️ Tech Stack

### 🌐 Frontend

- **Frontend**: React.js
- **Styling**: Tailwind CSS && ShadCN UI
- **State Management**: Redux

### 🗄️ Backend

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Calendar Integration**: React Big Calendar

## 🚀 API Design

### 🔐 Auth APIs

- **POST** /api/auth/user/register → Create new user account - DONE
- **POST** /api/auth/user/login → User login (returns JWT) - DONE

- **POST** /api/auth/doctor/register → Create doctor account - DONE
- **POST** /api/auth/doctor/login → Doctor login (returns JWT) - DONE

- **POST** /api/auth/logout → Logout (clear token/cookie) - DONE

### 🧑‍⚕️ Doctor APIs

- **GET** /api/doctors → Get all doctors (for user browsing) - DONE
- **GET** /api/doctors/:id → Get single doctor details - DONE

### 📅 Appointment APIs

#### 👤 User Side

- **POST** /api/appointments → Book appointment (user)
- **GET** /api/appointments/user → Get logged-in user's bookings
- **PATCH** /api/appointments/:id/cancel → User cancels appointment

#### 👨‍⚕️ Doctor Side

- **GET** /api/appointments/doctor → Get doctor's incoming requests
- **PATCH** /api/appointments/:id/accept → Accept appointment
- **PATCH** /api/appointments/:id/reject → Reject appointment
- **PATCH** /api/appointments/:id/complete → Mark appointment as completed

<!-- Niju@123 Password for user   -->
<!-- Hello@123 Password for doctor -->
