import "./static/App.css";
import React, { useState, useEffect } from "react";
import SearchBoxResult from "./components/SearchBoxResult";
import Trip from "./components/Trip/Trip";
import { Box, CssBaseline, Grid, Card } from "@material-ui/core";
// import SearchIcon from '@material-ui/icons/Search';
import Header from "./components/Header/Header";
import TogglePath from "./components/TogglePath";
import SearchNearByBtn from "./components/SearchNearByBtn";
import AutoCompleteInput from "./components/AutoCompleteInput";
import Clicker from "./components/Clicker";
import styles from "./components/Header/styles";
import useStyles from './components/Header/styles';
import { config } from "./config";
import TripHistory from "./components/TripHistory";
import InputForm from "./components/InputForm";

function App() {
  const [locations, setLocations] = useState([]);
  const [clicker, setClicker] = useState({});
  const [placesService, setPlacesService] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [map, setMap] = useState(null);
  const [nearByLocation, setNearByLocation] = useState({});
  const [autoCompleteMarker, setAutoCompleteMarker] = useState(null);

  const [route, setRoute] = useState({});
  const [numTravellers, setNumTravellers] = useState("");
  const [businessType, setBusinessType] = useState("");
  const style = useStyles();

  function onScriptLoad() {
    // Initializing Map components
    const map_ = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: { lat: 40.78, lng: -73.96 },
    });
    setMap(map_);

    const pService = new window.google.maps.places.PlacesService(map_);
    setPlacesService(pService);
    const infowindow_ = new window.google.maps.InfoWindow();
    setInfowindow(infowindow_);

    const marker = new window.google.maps.Marker({
      map_,
      anchorPoint: new window.google.maps.Point(0, -29),
    });

    setAutoCompleteMarker(marker);

    const infowindowContent = document.getElementById("infowindow-content");
    infowindow_.setContent(infowindowContent);
    // Handle clicking event
    map_.addListener("click", (event) => {
      console.log(event);
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
      onScriptLoad();
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} sx={{ overflow: 'auto', maxHeight: '90vh%' }}>
        <Grid item xs={12} md={3} className={style.grid_container3}>
          <InputForm numTravellers={numTravellers} setNumTravellers={setNumTravellers}
            businessType={businessType} setBusinessType={setBusinessType} index={0}
            map={map}
            infowindow={infowindow}
            marker={autoCompleteMarker}
            setLocations={setLocations}
            data={locations} />

          {/* <AutoCompleteInput
            index={0}
            map={map}
            infowindow={infowindow}
            marker={autoCompleteMarker}
            setLocations={setLocations}
          /> */}
          <AutoCompleteInput
            index={1}
            map={map}
            infowindow={infowindow}
            marker={autoCompleteMarker}
            setLocations={setLocations}
          />
          {/* <AutoCompleteInput
            index={2}
            map={map}
            infowindow={infowindow}
            marker={autoCompleteMarker}
            setLocations={setLocations}
          /> */}
          <SearchBoxResult data={locations} />
          <TogglePath
            map={map}
            locations={locations}
            route={route}
            setRoute={setRoute}
          />
          <SearchNearByBtn
            map={map}
            infowindow={infowindow}
            placesService={placesService}
            setClicker={setClicker}
            nearByLocation={nearByLocation}
            setNearByLocation={setNearByLocation}
          />
          <Clicker clicker={clicker} setLocations={setLocations} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '10px',
            paddingLeft: '10px',
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            height: '120vh',
            overflow: 'auto',
            maxHeight: '90vh',
            '& ul': { padding: 0 },
          }}>
            <div id="sidebar"></div>
            <div id="infowindow-content">
              <img id="place-icon" src="" height="16" width="16" />
              <span id="place-name" class="title"></span>
              <br />
              Place ID <span id="place-id"></span>
              <br />
              <span id="place-address"></span>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '10px',
            paddingLeft: '10px',
            width: '100%',
            maxWidth: 700,
            bgcolor: 'background.paper',
            position: 'relative',
            height: '120vh',
            overflow: 'auto',
            maxHeight: '90vh',
            '& ul': { padding: 0 },
          }}>
            <div style={{ width: 900, height: "85vh" }} id="map" />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
