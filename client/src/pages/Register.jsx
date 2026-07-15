import { useAsyncError, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios.js";

function Register() {
  const [formData, setFormData] = useState({
    accountName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    error: null,
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/register", formData, {
        skipAuthRefresh: true,
      });

      setMessage({
        text: response?.data?.message,
        error: false,
      });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message,
        error: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="flex flex-col items-center gap-5 w-[90%] max-w-[380px] border px-10 py-12 pt-8 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <h1 className="self-start text-md pb-1">
            Welcome to <br />{" "}
            <span className="font-bold text-2xl">Clippointment!</span>
          </h1>
          <p className="text-sm text-gray-400">
            Please enter your details to register
          </p>
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="email">
            Account name
          </label>
          <input
            id="accountName"
            className="border-2 p-2 w-full"
            type="text"
            placeholder="Juan dela Cruz"
            onChange={handleInput}
            value={formData.name}
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border-2 p-2 w-full"
            type="email"
            placeholder="email@example.com"
            onChange={handleInput}
            value={formData.email}
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="border-2 p-2 w-full"
            type="password"
            onChange={handleInput}
            value={formData.password}
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="password">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            className="border-2 p-2 w-full"
            type="password"
            onChange={handleInput}
            value={formData.confirmPassword}
          />
        </div>

        <div className="w-full">
          <button
            className={`bg-black text-white w-full p-3 ${!isSubmitting && "hover:font-semibold"}`}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creating your account..." : "Create account"}
          </button>
          <p className="pt-2 text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

        {message.text && (
          <p
            className={`${message.error ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"} p-2 w-full text-center text-sm italic`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;
