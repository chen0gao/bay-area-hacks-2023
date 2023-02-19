import { Box, Container } from "@material-ui/core";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

function TripHistory({ data }) {
  return (
    <Container style ={{        width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '90vh',
    '& ul': { padding: 0 },}}>
      {data.map((ele) =>
        <Box
          key={ele.tripName}
          p={1}
          m={1}
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
