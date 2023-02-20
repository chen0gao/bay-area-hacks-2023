import React, { useState, useEffect } from "react";
import { createRoute } from "../gmapApi";

function ClearPath({
  index,
  map,
  locations,
  directionsService,
  routes,
  setRoutes,
}) {
  function clickEvent() {
    // console.log(routes);
    if (index in routes) {
      routes[index].directionsRenderer.setMap(null);
      routes[index].directionsRenderer.setPanel(null);

      routes[index].locations = [];
      delete routes[index].directionsRenderer;
    }

    setRoutes({ ...routes });
  }

  return (
    <>
      <button onClick={clickEvent}>Clear Path for {index}</button>
    </>
  );
}

export default ClearPath;
