import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import SignupForm from "./components/forms/SignupForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

export default App;
