import React, { useState, useEffect } from "react";

function TogglePath({ directionsService, directionsRenderer, locations }) {
  function clickEvent() {
    console.log(locations);

    const waypointList = [];

    locations.forEach((ele) => {
      waypointList.push({
        location: new window.google.maps.LatLng(ele.lat, ele.lng),
        stopover: true,
      });
    });
    // console.log(locations);
    // console.log(waypointList);

    let src = locations.shift();
    let desc = locations.pop();

    directionsService
      .route({
        origin: src,
        destination: desc,
        waypoints: waypointList,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));
  }

  return (
    <>
      <button onClick={clickEvent}>Toggle Current Path</button>
    </>
  );
}

export default TogglePath;
