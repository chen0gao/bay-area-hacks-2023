import React, { useState, useEffect } from "react";
import { createRoute } from "./../gmapApi";

function TogglePath({ map, locations, route, setRoute }) {
  function clickEvent() {
    console.log(locations);

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setPanel(document.getElementById("sidebar"));

    directionsRenderer.setMap(map);

    let rand = Math.floor(Math.random() * 5);
    let colors = ["red", "yellow", "green", "blue", "orange"];

    const waypointList = [];

    const locations_copy = locations.map((a) => ({ ...a }));

    let src = locations_copy.shift();
    let desc = locations_copy.pop();

    locations_copy.forEach((ele) => {
      waypointList.push({
        location: new window.google.maps.LatLng(ele.lat, ele.lng),
        stopover: true,
      });
    });

    // console.log(locations);
    // console.log(waypointList);

    createRoute(directionsRenderer, directionsService, {
      color: colors[rand],
      origin: src,
      destination: desc,
      waypoints: waypointList,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
  }

  return (
    <>
      <button onClick={clickEvent}>Toggle Current Path</button>
    </>
  );
}

export default TogglePath;
