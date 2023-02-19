import Topbar from "../components/Topbar";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  
  const navigate = useNavigate();
  const userId = "63f1850c5ee346cc22311b54";
  const tripId = "63f29f4cfeec6927c7b387b0";
  const trip = {
    "date":"2023-05-20",
    "locations":[
      {"name":"boston", "latitude":2, "logtitude":2},
      {"name":"boston", "latitude":3, "logtitude":3},
      {"name":"boston", "latitude":4, "logtitude":4}
    ]
    }
  
  useEffect(() => {
    const fetchUser = async ()=>{
      const res = localStorage.getItem("user_info");
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

  const postTripHandler = () => {
    try{
      console.log(axios.post(`/trips/${userId}`, trip));
    }catch(err){
      console.log(err);
    }
  }

  const deleteTripHandler = () => {
    try{
      axios.delete(`/trips/${tripId}`);
    }catch(err){
      console.log(err);
    }

  }

  const getTripHandler = () =>{

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


