import "./static/App.css";
import React, { useState, useEffect } from "react";
import SearchBoxResult from "./components/SearchBoxResult";
import TogglePath from "./components/TogglePath";
import Clicker from "./components/Clicker";
import { config } from "./config";

function App() {
  const [locations, setLocations] = useState([]);
  const [clicker, setClicker] = useState({});
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [map, setMap] = useState(null);

  function onScriptLoad() {
    const service = new window.google.maps.DirectionsService();
    const render = new window.google.maps.DirectionsRenderer();
    setDirectionsService(service);
    setDirectionsRenderer(render);

    render.setPanel(document.getElementById("sidebar"));
    const map_ = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
    });

    setMap(map_);

    const pService = new window.google.maps.places.PlacesService(map_);
    setPlacesService(pService);

    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("pac-input"),
      options
    );

    const infowindow_ = new window.google.maps.InfoWindow();
    setInfowindow(infowindow);
    // const infowindowContent = document.getElementById("infowindow-content");
    autocomplete.bindTo("bounds", map_);

    const marker = new window.google.maps.Marker({
      map_,
      anchorPoint: new window.google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
      infowindow_.close();
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
        map_.fitBounds(place.geometry.viewport);
      } else {
        map_.setCenter(place.geometry.location);
        map_.setZoom(17);
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
      infowindow_.open(map_, marker);
    });

    render.setMap(map_);

    const infowindowContent = document.getElementById("infowindow-content");
    infowindow_.setContent(infowindowContent);
    // Handle clicking event
    map_.addListener("click", (event) => {
      console.log("You clicked on: " + event.latLng);
      // If the event has a placeId, use it.
      if (isIconMouseEvent(event)) {
        console.log("You clicked on place:" + event.placeId);
        // Calling e.stop() on the event prevents the default info window from
        // showing.
        // If you call stop here when there is no placeId you will prevent some
        // other map click event handlers from receiving the event.
        event.stop();
        if (event.placeId) {
          pService.getDetails({ placeId: event.placeId }, (place, status) => {
            if (
              status === "OK" &&
              place &&
              place.geometry &&
              place.geometry.location
            ) {
              setClicker({
                name: place.name,
                lat: place.geometry.location.toJSON().lat,
                lng: place.geometry.location.toJSON().lng,
              });
              infowindow_.close();
              infowindow_.setPosition(place.geometry.location);
              infowindowContent.children["place-icon"].src = place.icon;
              infowindowContent.children["place-name"].textContent = place.name;
              infowindowContent.children["place-id"].textContent =
                place.place_id;
              infowindowContent.children["place-address"].textContent =
                place.formatted_address;
              infowindow_.open(map_);
            }
          });
        }
      }
    });
  }

  function isIconMouseEvent(e) {
    return "placeId" in e;
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
      <div id="sidebar"></div>
      <div style={{ width: 500, height: 500 }} id="map" />
      <div id="infowindow-content">
        <img id="place-icon" src="" height="16" width="16" />
        <span id="place-name" class="title"></span>
        <br />
        Place ID <span id="place-id"></span>
        <br />
        <span id="place-address"></span>
      </div>
      <SearchBoxResult data={locations} />
      <TogglePath
        locations={locations}
        directionsService={directionsService}
        directionsRenderer={directionsRenderer}
      />
      <Clicker clicker={clicker} setLocations={setLocations} />
    </>
  );
}

export default App;
