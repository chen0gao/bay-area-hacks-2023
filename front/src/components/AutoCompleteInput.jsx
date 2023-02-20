import React, { useEffect, useState } from "react";

function AutoCompleteInput({
  index,
  map,
  infowindow,
  marker,
  routes,
  setRoutes,
}) {
  let isLoading = false;

  function initial() {
    if (isLoading) return;
    isLoading = true;

    // console.log(map);
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("pac-input" + index),
      options
    );

    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      console.log(place);

      if (!(index in routes)) {
        routes[index] = { locations: [] };
      }

      routes[index].locations.push({
        name: place.name,
        lat: place.geometry.location.toJSON().lat,
        lng: place.geometry.location.toJSON().lng,
      });

      routes[index].src = setRoutes({ ...routes });

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      // infowindowContent.children["place-name"].textContent = place.name;
      // infowindowContent.children["place-address"].textContent =
      // place.formatted_address;
      infowindow.open(map, marker);
    });
  }

  return (
    <>
      <div id="pac-container">
        <input
          onClick={initial}
          id={"pac-input" + index}
          type="text"
          placeholder="Enter a location"
        />
      </div>
    </>
  );
}

export default AutoCompleteInput;
