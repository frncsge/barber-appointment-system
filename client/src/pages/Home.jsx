import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  async function handleLogout() {
    try {
      const response = await api.post("/auth/log-out");

      alert(response?.data?.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
      alert(error.response?.data?.message);
    }
  }

  return (
    <div>
      <h1>Home page babyyy</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
