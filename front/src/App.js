import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBoxResult from "./components/SearchBoxResult";
import TogglePath from "./components/TogglePath";
import { config } from "./config";

function App() {
  const [locations, setLocations] = useState([]);
  const [clicker, setClicker] = useState(0);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  function onScriptLoad() {
    const service = new window.google.maps.DirectionsService();
    const render = new window.google.maps.DirectionsRenderer();
    setDirectionsService(service);
    setDirectionsRenderer(render);

    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
    });

    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("pac-input"),
      options
    );

    const infowindow = new window.google.maps.InfoWindow();
    // const infowindowContent = document.getElementById("infowindow-content");
    autocomplete.bindTo("bounds", map);

    const marker = new window.google.maps.Marker({
      map,
      anchorPoint: new window.google.maps.Point(0, -29),
    });
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

      // console.log(place.geometry.location.lng().toString());
      setLocations((locations) => [
        ...locations,
        {
          name: place.name,
          lat: place.geometry.location.toJSON().lat,
          lng: place.geometry.location.toJSON().lng,
        },
      ]);

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      // infowindowContent.children["place-name"].textContent = place.name;
      // infowindowContent.children["place-address"].textContent =
      // place.formatted_address;
      infowindow.open(map, marker);
    });

    render.setMap(map);
  }

  //Intializing Google Map API
  useEffect(() => {
    // Embeding Google API
    if (!window.google) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=${config.api_key}&callback=initMap&libraries=places`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", (e) => {
        onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }, []);

  return (
    <>
      <div id="pac-container">
        <input id="pac-input" type="text" placeholder="Enter a location" />
      </div>
      <div style={{ width: 500, height: 500 }} id="map" />
      <SearchBoxResult data={locations} />
      <TogglePath
        locations={locations}
        directionsService={directionsService}
        directionsRenderer={directionsRenderer}
      />
    </>
  );
}

export default App;
