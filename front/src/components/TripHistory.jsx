import { Box, Container } from "@material-ui/core";

function TripHistory({ data }) {
  return (
    <Container>
      {data.map((ele) =>
        <Box
          key={ele.tripName}
          p={3}
          m={2}
          style={{ background: 'white', borderRadius: '16px', border: '2px solid #000' }}
        >
         <h2>Trip Name: {ele.tripName}</h2> 
         <p>Date Traveled: {ele.tripDate}</p>
        </Box>
      )}
    </Container>
  );
}

export default TripHistory;
