import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import UserSignupForm from "./components/forms/UserSignupForm";
import Main from "./components/Main";
import Layout from "./components/Layout";
import DoctorSignupForm from "./components/forms/DoctorSignupForm";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<UserSignupForm />} />
      <Route path="/doctor/signup" element={<DoctorSignupForm />} />

      {/* Protected / App routes */}
      <Route element={<Layout />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
