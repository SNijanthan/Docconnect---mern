<!-- # 🩺 DocConnect – Online Doctor Appointment Booking App

## 🧠 Overview

**DocConnect** is a full-stack web application that enables users to seamlessly book doctor appointments online.

- 👤 Patients can browse doctors, filter by specialization, and book appointments.
- 👨‍⚕️ Doctors can manage appointments, accept/reject requests, and track schedules.

---

## ⚙️ Tech Stack

### 🌐 Frontend

- React.js (Vite)
- Tailwind CSS / Shadcn UI
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

- POST `/api/auth/user/register` → Register user
- POST `/api/auth/user/login` → User login
- POST `/api/auth/doctor/register` → Register doctor
- POST `/api/auth/doctor/login` → Doctor login
- POST `/api/auth/logout` → Logout

---

### 🧑‍⚕️ Doctor APIs

- GET `/api/doctors` → Get all doctors
- GET `/api/doctors/:id` → Get doctor details

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

If you like this project, give it a ⭐ on GitHub! -->

# 🩺 DocConnect

> A full-stack web application for booking and managing doctor appointments online.

Patients can browse doctors, filter by specialization, and book consultations. Doctors get a dedicated dashboard to accept, reject, and complete appointments in real time.

---

## 🧠 Features

| Feature                      | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| 🔐 Role-based Auth           | Separate login/register flows for patients and doctors       |
| 🔍 Doctor Discovery          | Browse and filter doctors by specialization                  |
| 📅 Appointment Booking       | Book online or in-person consultations                       |
| ⚡ Real-time Updates         | Accept/reject/complete actions update UI instantly via Redux |
| ❌ Cancellation              | Patients can cancel pending or confirmed appointments        |
| 🚫 Duplicate Slot Protection | Prevents double-booking the same doctor at the same time     |
| 🌙 Dark Mode                 | Full dark mode support across all components                 |

---

## ⚙️ Tech Stack

### Frontend

| Tool                     | Purpose                 |
| ------------------------ | ----------------------- |
| React.js (Vite)          | UI framework            |
| Tailwind CSS + shadcn/ui | Styling and components  |
| Redux Toolkit            | Global state management |
| React Router v6          | Client-side routing     |
| Axios                    | HTTP requests           |

### Backend

| Tool                  | Purpose               |
| --------------------- | --------------------- |
| Node.js + Express.js  | REST API server       |
| MongoDB + Mongoose    | Database and ODM      |
| JWT                   | Authentication tokens |
| Cookie-based sessions | Secure token storage  |

---

## 🏗️ Project Structure

```
doc-connect/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── store/           # Redux slices and store
│   │   └── main.jsx
│   └── .env
│
└── server/                  # Backend (Node + Express)
    ├── controllers/         # Route handler logic
    ├── models/              # Mongoose schemas
    ├── routes/              # Express route definitions
    ├── middleware/           # Auth and error middleware
    └── .env
```

---

## 🚀 API Reference

### 🔐 Auth

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/auth/user/register`   | Register a patient     |
| POST   | `/api/auth/user/login`      | Patient login          |
| POST   | `/api/auth/doctor/register` | Register a doctor      |
| POST   | `/api/auth/doctor/login`    | Doctor login           |
| POST   | `/api/auth/logout`          | Logout (clears cookie) |

### 🧑‍⚕️ Doctors

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | `/api/doctors`     | List all doctors       |
| GET    | `/api/doctors/:id` | Get a doctor's profile |

### 📅 Appointments — Patient

| Method | Endpoint                       | Description                            |
| ------ | ------------------------------ | -------------------------------------- |
| POST   | `/api/appointment`             | Book a new appointment                 |
| GET    | `/api/appointments/user`       | Get all bookings for logged-in patient |
| PATCH  | `/api/appointments/:id/cancel` | Cancel a pending/confirmed appointment |

### 📅 Appointments — Doctor

| Method | Endpoint                         | Description                               |
| ------ | -------------------------------- | ----------------------------------------- |
| GET    | `/api/appointments/doctor`       | Get all received appointments             |
| PATCH  | `/api/appointments/:id/accept`   | Accept a pending appointment              |
| PATCH  | `/api/appointments/:id/reject`   | Reject a pending appointment              |
| PATCH  | `/api/appointments/:id/complete` | Mark an accepted appointment as completed |

---

## 🔐 Authentication

- JWT tokens issued on login, stored in **HTTP-only cookies**
- All protected routes validated via auth middleware
- Role-based access control — patients and doctors see different data and actions

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/doc-connect.git
cd doc-connect
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

Start the server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000/api

```

Start the dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📦 State Management

Redux Toolkit is used to manage appointment state globally:

| Slice              | Actions                                        |
| ------------------ | ---------------------------------------------- |
| `appointmentSlice` | `setUserAppointments`, `setDoctorAppointments` |
|                    | `addAppointment`, `removeAppointment`          |
|                    | `updateAppointmentStatus` (patient-side)       |
|                    | `updateDoctorAppointmentStatus` (doctor-side)  |
|                    | `clearAppointments`                            |

---

## 🚧 Project Status

| Area              | Status         |
| ----------------- | -------------- |
| Backend API       | 🚧 In Progress |
| Frontend UI       | 🚧 In Progress |
| Authentication    | ✅ Complete    |
| Appointment flows | ✅ Complete    |
| Payments          | ⏳ Planned     |
| Notifications     | ⏳ Planned     |

---

## 📌 Roadmap

- [ ] Payment integration (Razorpay / Stripe)
- [ ] Email & SMS notifications on booking/status change
- [ ] Doctor ratings and reviews
- [ ] Real-time availability calendar
- [ ] Admin dashboard
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch — `git checkout -b feat/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ⭐ Support

If you found this project useful, give it a ⭐ on GitHub — it helps a lot!
