import Topbar from "../components/Topbar";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  

  useEffect(() => {
    const fetchUser = async ()=>{
      const res = localStorage.getItem("user_info");
      const user = await res;
      setUser(user);
    }
    fetchUser();
    if(!user){
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
      <Topbar/>
      {/* hi
      <button onClick={handleClick}>
        logout
      </button> */}
    </div>
  );
}


