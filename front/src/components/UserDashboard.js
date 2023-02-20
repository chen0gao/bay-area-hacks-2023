import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserDashboard() {
  const [value, setValue] = useState(0);
  const [trip, setTrip] = useState([]);
  const [user, setUser] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getTripHandler = () =>{
  //   try{
  //     const res = axios.get("/trips/" + userId);
  //     console.log(res);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("user_info"));
    setUser(result);
    try {
      const userId = user._id;
      axios.get("/trips/" + userId).then((res)=>{
        setTrip(res);
      })
      console.log(trip);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 110,
      }}
    >
      <Tabs orientation="vertical" value={value} onChange={handleChange}>
        <Tab label="Trip History" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
            },
          }}
        >
          


          
          {/* {trip && trip.data.map((ele,index)=>{
            return (
              "test"
              // <Card
              // date={ele.date}
              // start={ele.locations[0]}
              // dest={ele.locations[ele.locations.length-1]}
              // />
            )
          })} */}
          <Card 
          start="test"
          dest="dest"
          date="testDate"/>
          <Card />
          <Card />
        </Box>
      </TabPanel>
    </Box>
  );
}
