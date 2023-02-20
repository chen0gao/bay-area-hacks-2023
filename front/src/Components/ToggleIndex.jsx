import React, { useEffect, useState } from "react";

function ToggleIndex({ index, routes, setTabNumber }) {
  function initial() {
    let newIndex = document.querySelector("#tab-input").value;
    setTabNumber(newIndex);

    for (let ind in routes) {
      if (ind != newIndex) {
        if (routes[ind].directionsRenderer)
          routes[ind].directionsRenderer.setPanel(null);
      } else {
        console.log(routes[ind]);
        if (routes[ind] && routes[ind].directionsRenderer) {
          routes[ind].directionsRenderer.setPanel(
            document.getElementById("sidebar")
          );
        }
      }
    }
  }

  return (
    <>
      <div id="pac-container">
        <input
          onChange={initial}
          id={"tab-input"}
          type="text"
          placeholder="Enter a Index"
        />
      </div>
    </>
  );
}

export default ToggleIndex;
