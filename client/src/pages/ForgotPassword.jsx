import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useState } from "react";
import api from "../api/axios.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/password-resets", {
        email,
      });

      setMessage(response?.data?.message);

      sessionStorage.setItem("otpVerification", email);

      navigate("/forgot-password/verify-otp");
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
        <h1 className="self-start text-2xl font-bold mb-1">Forgot password</h1>

        <label htmlFor="email" className="self-start text-sm mb-2">
          Enter your email address.
        </label>
        <input
          id="email"
          type="text"
          inputMode="email"
          className="border-2 w-full p-2"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="mt-5 w-full bg-black text-white p-3 hover:font-semibold"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Loading..." : "Continue"}
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

export default ForgotPassword;
