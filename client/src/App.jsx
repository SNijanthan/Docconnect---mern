import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import UserSignupForm from "./components/forms/UserSignupForm";
import DoctorDashboard from "./components/Main/DoctorDashboard";
import UserDashboard from "./components/Main/UserDashboard";
import Layout from "./components/Layout";
import DoctorSignupForm from "./components/forms/DoctorSignupForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<UserSignupForm />} />
        <Route path="/doctor/signup" element={<DoctorSignupForm />} />

        {/* Doctor Protected */}
        <Route element={<ProtectedRoute allowedRole="doctor" />}>
          <Route element={<Layout />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          </Route>
        </Route>

        {/*  User Protected */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route element={<Layout />}>
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
