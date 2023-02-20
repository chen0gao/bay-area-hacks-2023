import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";

import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Road Trip Planner
        </Typography>
        <Box display="flex">
          <Typography variant="h7" className={classes.title}>
            Go where your heart takes you
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
