import React, { useState, useEffect } from "react";
import { createRoute } from "../gmapApi";
import styles from "./Header/styles";
import useStyles from "./Header/styles";
import {Button} from "@material-ui/core";

function TogglePath({ index, map, directionsService, routes, setRoutes }) {
  const style = useStyles();
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

    let rand = Math.floor(Math.random() * 5);
    let colors = ["red", "yellow", "green", "blue", "orange"];

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

    createRoute(routes[index].directionsRenderer, directionsService, {
      color: colors[rand],
      origin: src,
      destination: desc,
      waypoints: waypointList,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setRoutes({ ...routes });
  }

  return (
    <>
      <Button                 
        variant="contained"
        type="button"
        id="b3"
        value={"Find "}
        className={style.search}
        onClick={clickEvent}>Add Path for {index}</Button>
    </>
  );
}

export default TogglePath;
