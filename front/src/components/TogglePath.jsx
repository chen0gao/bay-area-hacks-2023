import React, { useState, useEffect } from "react";

function TogglePath({ directionsService, directionsRenderer, locations }) {
  function clickEvent() {
    console.log(locations);

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

    directionsService
      .route({
        origin: src,
        destination: desc,
        waypoints: waypointList,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        console.log(response);
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
