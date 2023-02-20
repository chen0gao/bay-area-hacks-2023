import React, { useEffect, useState } from "react";
import { InputLabel, Input } from "@material-ui/core";

function AutoCompleteInput({
  title,
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

    const infowindowContent = document.getElementById("infowindow-content");
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
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

      // console.log(place.geometry.location.lng().toString());
      if (!(index in routes)) {
        routes[index] = { locations: [] };
      }

      routes[index].locations.push({
        name: place.name,
        lat: place.geometry.location.toJSON().lat,
        lng: place.geometry.location.toJSON().lng,
      });

      setRoutes({ ...routes });

      console.log(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindow.setPosition(place.geometry.location);

      infowindow.close();
      infowindowContent.children["place-icon"].src = place.icon;
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-id"].textContent = place.place_id;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
  }

  return (
    <>
      <InputLabel>{title}</InputLabel>
      <Input onClick={initial} id={"pac-input" + index} type="text" />
    </>
  );
}

export default AutoCompleteInput;
