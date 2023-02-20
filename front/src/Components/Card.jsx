import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);


export default function BasicCard({date, start, dest, tripId}) {
  const navigate = useNavigate();
  const handleDelete = () => {
    try{
      axios.delete(`/trips/${tripId}`);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {start}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          to
        </Typography>
        <Typography variant="h5" component="div">
          {dest}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small" onClick={handleDelete}>Delete Trip</Button> 
      </CardActions>
      
    </Card>
  );
}
