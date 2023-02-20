import Topbar from "../components/Topbar";
import UserDashboard from "../components/UserDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = localStorage.getItem("user_info");
      setUser(res);
      if (!res) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <Topbar />
      <UserDashboard />
    </div>
  );
}
