import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import SignupForm from "./components/forms/SignupForm";
import Main from "./components/Main";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Protected / App routes */}
      <Route element={<Layout />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
