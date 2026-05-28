import { useEffect, useState } from "react";
import { IoChevronBackSharp, IoPlaySkipForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { publicApi } from "../api/axios.js";

function PasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const email = sessionStorage.getItem("passwordReset");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password/verify-otp");
    }
  }, [email, navigate]);

  const handleBackClick = () => {
    navigate("/forgot-password/verify-otp");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await publicApi.post("/auth/password-resets/confirm", {
        email,
        newPassword: password,
        confirmNewPassword: confirm,
      });

      setMessage(response?.data?.message);

      sessionStorage.removeItem("passwordReset");

      alert("New password saved!");

      await checkAuth();
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen mt-10">
      <div className="flex flex-col items-center w-[90%] max-w-[380px]">
        <IoChevronBackSharp
          className="self-start mb-6 -ml-2 cursor-pointer"
          size={30}
          onClick={handleBackClick}
        />
        <h1 className="self-start text-2xl font-bold mb-1">New password</h1>

        <label htmlFor="password" className="self-start text-sm mb-2">
          Enter new password for francisge527@gmail.com Clippointment account.
        </label>
        <input
          id="password"
          type="password"
          className="border-2 w-full p-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label htmlFor="confirm" className="self-start text-sm mt-5 mb-2">
          Confirm password
        </label>
        <input
          id="confirm"
          type="password"
          className="border-2 w-full p-2"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
        />

        <button
          className="mt-5 w-full bg-black text-white p-3 hover:font-semibold"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Loading..." : "Reset Password"}
        </button>

        {message && (
          <p className="text-gray-500 bg-gray-100 p-2 mt-3 w-full text-center text-sm italic">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default PasswordReset;
