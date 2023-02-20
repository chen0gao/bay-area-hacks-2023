import { Box } from "@material-ui/core";

const Trip = () => {
  return (
    <Box
      display="flex"
      style={{
        width: "100%",
        position: "relative",
        maxWidth: 360,
        maxHeight: "35vh",
        "& ul": { padding: 0 },
      }}
    >
      <div id="pac-container" style={{ fontSize: 20 }}>
        Here are the trips you searched for:
      </div>
    </Box>
  );
};

export default Trip;
