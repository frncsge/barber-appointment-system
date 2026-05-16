import { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

function VerifyOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");

  const [cooldown, setCooldown] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState(
    localStorage.getItem("cooldownEnd"),
  );

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/forgot-password");
  };

  const email = sessionStorage.getItem("otpVerification");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/password-resets/verify", {
        email,
        otp,
      });

      setMessage(response?.data?.message);

      sessionStorage.setItem("passwordReset", email);

      navigate("/password-reset");
    } catch (error) {
      setMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;

    const updateCooldown = () => {
      const storedEndTime = localStorage.getItem("cooldownEnd");

      if (!storedEndTime) return;

      const remaining = Math.max(
        0,
        Math.ceil((Number(storedEndTime) - Date.now()) / 1000),
      );

      setCooldown(remaining);

      if (remaining <= 0) {
        localStorage.removeItem("cooldownEnd");
        clearInterval(interval);
      }
    };

    updateCooldown();

    interval = setInterval(updateCooldown, 1000);

    return () => clearInterval(interval);
  }, [cooldownEnd]);

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      const response = await api.post("/auth/password-resets", {
        email,
      });

      setMessage(response?.data?.message);
    } catch (error) {
      setMessage(error.response?.data?.message);
      return;
    }

    const endTime = Date.now() + 60 * 1000;
    localStorage.setItem("cooldownEnd", endTime.toString());

    setCooldownEnd(endTime.toString());
  };

  return (
    <div className="flex justify-center h-screen mt-10">
      <div className="flex flex-col items-center w-[90%] max-w-[380px]">
        <IoChevronBackSharp
          className="self-start mb-6 -ml-2 cursor-pointer"
          size={30}
          onClick={handleBackClick}
        />
        <h1 className="self-start text-2xl font-bold mb-1">
          Verify 6-digit OTP
        </h1>

        <label htmlFor="otp" className="self-start text-sm mb-2">
          We’ve sent a 6-digit verification code to your email. Enter it below
          to reset your password.
        </label>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          className="border-2 w-full p-2 text-center tracking-[0.5rem]"
          placeholder="------"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
        />
        <p className="text-sm self-end mt-1">
          Did not receive code?{" "}
          <span
            className={
              cooldown > 0
                ? "text-gray-500 cursor-default"
                : "text-blue-700 cursor-pointer hover:underline"
            }
            onClick={handleResend}
          >
            {cooldown > 0 ? `Resend in ${cooldown}` : "Resend"}
          </span>
        </p>

        <button
          className="mt-5 w-full bg-black text-white p-3 hover:font-semibold"
          disabled={isLoading}
          onClick={handleVerify}
        >
          {isLoading ? "Loading..." : "Verify"}
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

export default VerifyOtp;
