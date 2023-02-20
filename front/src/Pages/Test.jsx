import Topbar from "../components/Topbar";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState([]);
  
  const navigate = useNavigate();
  //user Id can be get as: const user = localStorage.getItem("user_info");
  //user.userId
  const userId = "63f1850c5ee346cc22311b54";
  const tripId = "63f29f4cfeec6927c7b387b0";
  const trip = {
    "date":"2023-05-20",
    "locations":[
      {"name":"new york", "latitude":2, "longtitude":2},
      {"name":"new york", "latitude":3, "longtitude":3},
      {"name":"new york", "latitude":4, "longtitude":4}
    ]
  }
  
  useEffect(() => {
    const fetchUser = async ()=>{
      const res = localStorage.getItem("user_info");
      setUser(res);
      //console.log(user);
      if(!res){
        navigate("/login");
      }
    }
    fetchUser();
  }, []);

  const handleClick = (e) => {
    // e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }

  //post trip
  const postTripHandler = () => {
    try{
      console.log(axios.post(`/trips/${userId}`, trip));
    }catch(err){
      console.log(err);
    }
  }

  //delete trip by id
  const deleteTripHandler = () => {
    try{
      axios.delete(`/trips/${tripId}`);
    }catch(err){
      console.log(err);
    }

  }

  //get all trips by userId
  const getTripHandler = () =>{
    try{
      const res = axios.get("/trips/" + userId);
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <Topbar/>
      hi
      <button onClick={postTripHandler}>
        post trip
      </button>
      <button onClick={deleteTripHandler}>
        delete trip
      </button>
      <button onClick={getTripHandler}>
        get trip
      </button>
    </div>
  );
}


