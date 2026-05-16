import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
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
      const response = await api.post("/auth/log-in", {
        email,
        password,
      });

      setMessage(response?.data?.message);

      await checkAuth();
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 w-[90%] max-w-[300px]"
      >
        <h1>Login to Clippointment</h1>

        <input
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 p-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
        />

        <button className="bg-black text-white w-full p-2" type="submit">
          Login
        </button>

        <p className="text-red-500 text-center text-sm italic">{message}</p>
      </form>
    </div>
  );
}

export default Login;
