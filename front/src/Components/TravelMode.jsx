import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createRoute } from "../gmapApi";

export default function TravelMode({
  index,
  setTravel,
  directionsService,
  routes,
  setRoutes,
}) {
  const handleChange = (event) => {
    setTravel(event.target.value);

    // let rand = Math.floor(Math.random() * 5);
    // let colors = ["red", "yellow", "green", "blue", "orange"];
    let colors = ["red"];

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
      color: colors[0],
      origin: src,
      destination: desc,
      waypoints: waypointList,
      travelMode:
        window.google.maps.TravelMode[event.target.value.toUpperCase()],
    });

    setRoutes({ ...routes });
  };
  return (
    <FormControl
      style={{
        position: "absolute",
        right: "4%",
        top: "11%",
        zIndex: 999,
        backgroundColor: "white",
        opacity: 0.9,
      }}
    >
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="Walking"
      >
        <FormControlLabel
          onChange={handleChange}
          value="Walking"
          control={<Radio />}
          label="Walking"
        />
        <FormControlLabel
          onChange={handleChange}
          value="Bicycling"
          control={<Radio />}
          label="Bicycling"
        />
        <FormControlLabel
          onChange={handleChange}
          value="Driving"
          control={<Radio />}
          label="Driving"
        />
        <FormControlLabel
          onChange={handleChange}
          value="Transit"
          control={<Radio />}
          label="Transit"
        />
      </RadioGroup>
    </FormControl>
  );
}
