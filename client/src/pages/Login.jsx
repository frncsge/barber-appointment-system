import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { checkAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await publicApi.post("/auth/log-in", {
        email,
        password,
      });

      setMessage(response?.data?.message);

      await checkAuth();
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 w-[90%] max-w-[380px] border px-10 py-12 pt-8 bg-white"
      >
        <div className="w-full">
          <h1 className="self-start text-md pb-1">
            Welcome to <br />{" "}
            <span className="font-bold text-2xl">Clippointment!</span>
          </h1>
          <p className="text-sm text-gray-400">Please enter your details</p>
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 p-2 w-full"
            type="email"
            placeholder="email@example.com"
            value={email}
          />
        </div>

        <div className="w-full">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 p-2 w-full"
            type="password"
            value={password}
          />
          <p
            className="text-sm cursor-pointer text-right pt-2 hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>

        <div className="w-full">
          <button
            className="bg-black text-white w-full p-3 hover:font-semibold"
            type="submit"
          >
            Login
          </button>
          <p className="pt-2 text-sm text-center">
            Don't have an account?{" "}
            <span className="text-blue-700 cursor-pointer hover:underline">
              Create Account
            </span>
          </p>
        </div>

        {message && (
          <p className="text-red-500 bg-red-100 p-2 w-full text-center text-sm italic">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
