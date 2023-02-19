import Topbar from "../components/Topbar";
import {useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
    }
  }, []);

  const handleClick = (e) => {
    // e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div>
      hi
      <button onClick={handleClick}>
        logout
      </button>
    </div>
  );
}
