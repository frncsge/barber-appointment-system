import api from "../api/axios.js";
import { replace, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await api.post("/auth/log-out");

      alert(response?.data?.message);
      navigate("/login", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message);
      alert(error.response?.data?.message);
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Dashboard babyyy</h1>
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
}

export default Dashboard;
