import styles from "./Header/styles";
import useStyles from "./Header/styles";
import { Button } from "@material-ui/core";

function AddLocation({ clicker, index, routes, setRoutes }) {
  const style = useStyles();
  function clickEvent() {
    if (!(index in routes)) {
      routes[index] = { locations: [] };
    }

    routes[index].locations.push(clicker);

    routes[index].src = setRoutes({ ...routes });

    console.log(routes);
  }
  return (
    <>
      <Button onClick={clickEvent}
                variant="contained"
                type="button"
                id="b3"
                value={"add point"}
        className={style.search}
      >Add Point</Button>
    </>
  );
}

export default AddLocation;
