import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserDashboard() {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    try {
      const userId = JSON.parse(localStorage.getItem("user_info"))._id;
      // const userId= "63f2e689e4d85d9d31430c92"
      axios.get(`trips/${userId}`).then((res) => {
        setTrip(res.data);
      });
      // console.log(trip);
    } catch (err) {
      console.log(err);
    }
  }, [trip]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 110,
      }}
    >
      <Box component="main" sx={{ p: 3 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {trip &&
            trip.map((ele, index) => {
              console.log(ele);
              return (
                <Grid item>
                  <Item>
                    <Card
                      date={ele.date}
                      start={ele.locations[0].name}
                      dest={ele.locations[ele.locations.length - 1].name}
                      tripId={ele._id}
                    />
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
}
