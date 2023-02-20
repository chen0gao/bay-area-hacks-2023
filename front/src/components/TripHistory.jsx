import { Box, Container, Typography} from "@material-ui/core";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

function TripHistory({ data }) {
  return (
    <Container>
       <Typography id="pac-container" style={{fontSize:18}}>
        Here are the trips you searched for:
      </Typography>
      {data.map((ele) =>
        <Box
          key={ele.tripName}
          style={{ background: 'white', borderRadius: '16px', border: '1px solid #3f51b5', alignItems: 'center'}}
        >
        <p align="center">
            {ele.name}
        </p>

        {/* <h2>Trip Name: {ele.tripName}</h2> 
        <p>Date Traveled: {ele.tripDate}</p> */}
        </Box>
      )}
    </Container>
    );
}

export default TripHistory;
