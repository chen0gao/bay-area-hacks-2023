import "./App.css";
import React, { useState, useEffect } from "react";
import Btn from "./Btn";
import SearchBoxResult from "./SearchBoxResult";
import { Box, CssBaseline, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

function App() {
  let directionsService = null;
  let directionsRenderer = null;

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // // Update the document title using the brow
    // const map = new window.google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 41.0082, lng: 28.9784 },
    //   zoom: 8,
    // });

    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer();
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

      console.log(place.geometry.location);
      setLocations((locations) => [
        ...locations,
        place.geometry.location.toString(),
      ]);

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      // infowindowContent.children["place-name"].textContent = place.name;
      // infowindowContent.children["place-address"].textContent =
      // place.formatted_address;
      infowindow.open(map, marker);
    });

    directionsRenderer.setMap(map);

    directionsService
      .route({
        origin: "Halifax, NS",
        destination: "New York, NY",
        waypoints: [
          {
            location: "montreal, quebec",
            stopover: true,
          },
          {
            location: "toronto, ont",
            stopover: true,
          },
        ],
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        console.log(response);
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));
  }, []);

  function test() {
    directionsService
      .route({
        origin: "Halifax, NS",
        destination: "New York, NY",
        waypoints: [
          {
            location: "Brooklyn, NY",
            stopover: true,
          },
          {
            location: "Queen, NY",
            stopover: true,
          },
        ],
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));
  }
  // console.log(window.google);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={6}>
          <Search />
          <SearchBoxResult data={locations} />
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ width: 900, height: "85vh" }} id="map" />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
