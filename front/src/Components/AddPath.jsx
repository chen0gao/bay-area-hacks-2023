import React, { useState, useEffect } from "react";
import { createRoute } from "../gmapApi";

function AddPath({ index, travel, map, directionsService, routes, setRoutes }) {
  function clickEvent() {
    // console.log(routes);
    if (index in routes && routes[index].directionsRenderer) {
      routes[index].directionsRenderer.setMap(null);
      routes[index].directionsRenderer.setPanel(null);
    }

    if (!routes[index].directionsRenderer) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      routes[index].directionsRenderer = directionsRenderer;
    }

    routes[index].directionsRenderer.setPanel(
      document.getElementById("sidebar")
    );

    routes[index].directionsRenderer.setMap(map);

    // let rand = Math.floor(Math.random() * 5);
    // let colors = ["red", "yellow", "green", "blue", "orange"];
    let colors = ["red"];

    const waypointList = [];

    const locations_copy = routes[index].locations.map((a) => ({ ...a }));

    let src = locations_copy.shift();
    let desc = locations_copy.pop();

    locations_copy.forEach((ele) => {
      waypointList.push({
        location: new window.google.maps.LatLng(ele.lat, ele.lng),
        stopover: true,
      });
    });

    console.log(travel);

    createRoute(routes[index].directionsRenderer, directionsService, {
      color: "red",
      origin: src,
      destination: desc,
      waypoints: waypointList,
      travelMode: window.google.maps.TravelMode[travel.toUpperCase()],
    });

    setRoutes({ ...routes });
  }

  return (
    <>
      <button onClick={clickEvent}>Add Path for {index}</button>
    </>
  );
}

export default AddPath;
