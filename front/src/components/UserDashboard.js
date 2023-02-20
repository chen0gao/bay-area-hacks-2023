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
  const [trip, setTrip] = useState(null);
  const [userId, setUser] = useState("63f2e689e4d85d9d31430c92");

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
    // const result = JSON.parse(localStorage.getItem("user_info"));
    // console.log(result);
    // setUser("63f2e689e4d85d9d31430c92");
    try {
      // const userId = user._id;

      const config = {
        server_host: "localhost",
        server_port: 8800,
      };
      // http://${config.server_host}:${config.server_port}/api/

      axios.get(`trips/${userId}`).then((res) => {
        console.log(res.data);
        setTrip(res.data);
      });
      // console.log(trip);
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
          {trip &&
            trip.map((ele, index) => {
              console.log(ele);
              return (
                <Card
                  date={ele.date}
                  start={ele.locations[0].name}
                  dest={ele.locations[ele.locations.length - 1].name}
                />
              );
            })}
        </Box>
      </TabPanel>
    </Box>
  );
}
