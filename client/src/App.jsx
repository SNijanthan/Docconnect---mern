import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import UserSignupForm from "./components/forms/UserSignupForm";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";
import UserDashboard from "./components/dashboard/UserDashboard";
import DoctorSignupForm from "./components/forms/DoctorSignupForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<UserSignupForm />} />
        <Route path="/doctor/signup" element={<DoctorSignupForm />} />

        {/* Doctor */}
        <Route element={<ProtectedRoute allowedRole="doctor" />}>
          <Route element={<Layout />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          </Route>
        </Route>

        {/* User */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Main />} /> {/* ✅ changed */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        expand={true}
        closeButton
        duration={2000}
      />
    </>
  );
}

export default App;
