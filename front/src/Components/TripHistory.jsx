import { Box, Container, Typography } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PlaceIcon from "@mui/icons-material/Place";

function TripHistory({ routes, setRoutes }) {
  let data = null;
  const handleDelete = (i) => {
    routes[0].locations.splice(i, 1);

    setRoutes({ ...routes });
  };
  if (routes && "0" in routes) data = routes[0].locations;
  return (
    <Container>
      <Typography id="pac-container" style={{ fontSize: 18 }}>
        Here are the trips you searched for:
      </Typography>
      {data &&
        data.map((ele, i) => {
          // console.log(ele);

          return (
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<PlaceIcon />}
                label={ele.name}
                variant="outlined"
                onDelete={() => handleDelete(i)}
              />
            </Stack>
          );
        })}
    </Container>
  );
}

export default TripHistory;
