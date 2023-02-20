import styles from "./Header/styles";
import useStyles from './Header/styles';
import { Button } from '@mui/material';

function Clicker({ clicker, setLocations }) {
  const style = useStyles();
  function clickEvent() {
    console.log(clicker);
    setLocations((locations) => [...locations, clicker]);
  }
  return (
    <>
       <Button onClick={clickEvent} variant="contained" type="button" id="b3" value={"Find "} className={style.search}>Add To Path</Button>
    </>
  );
}

export default Clicker;
