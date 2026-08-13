import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import PasswordReset from "./pages/PasswordReset.jsx";
import Schedule from "./pages/Schedule.jsx";
import Register from "./pages/Register.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>DEFAULT</h1>} />

      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/verify-otp" element={<VerifyOtp />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      <Route path="/register" element={<Register />} />
      <Route
        path="/email-verification"
        element={<VerifyEmail />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
