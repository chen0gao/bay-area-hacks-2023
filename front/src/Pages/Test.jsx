import Topbar from "../components/Topbar";
import {useNavigate } from "react-router-dom";

export default function Home() {
  
  const navigate = useNavigate();

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
