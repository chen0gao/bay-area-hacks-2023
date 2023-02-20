import {
  Button,
  InputUnstyled,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Card,
  Input,
  Grid,
} from "@material-ui/core";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useState from "react";
import styles from "./Header/styles";
import useStyles from "./Header/styles";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AutoCompleteInput from "./AutoCompleteInput";
import SearchNearByBtn from "./SearchNearByBtn";
import TripHistory from "./TripHistory";

// import { IconButton } from '@mui/material';
//map,infowindow,autoCompleteMarker,setLocations,

const InputForm = ({
  numTravellers,
  setNumTravellers,
  businessType,
  setBusinessType,
  tabNumber,
  map,
  infowindow,
  autoCompleteMarker,
  routes,
  setRoutes,
  nearByLocation,
  setNearByLocation,
  placesService,
  setClicker,
}) => {
  const style = useStyles();
  const handleChange = (e) => setBusinessType(e.target.value);
  console.log(businessType);
  console.log(numTravellers);

  return (
    <>
      {/* <TabContext value={numTravellers}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handleChange} aria-label="lab API tabs example">
      <Tab label="Item One" value="1" />
      <Tab label="Item Two" value="2" />
      <Tab label="Item Three" value="3" />
    </TabList>
  </Box>
  <TabPanel value="1">Item One</TabPanel>
  <TabPanel value="2">Item Two</TabPanel>
  <TabPanel value="3">Item Three</TabPanel>
</TabContext> */}
      <Card variant="outlined" className={style.overFlow}>
        <div id="container">
          <div id="first">
            <div class="grid-container" className={style.grid_container}>
              <div class="grid-item">
                <SearchNearByBtn
                  map={map}
                  infowindow={infowindow}
                  placesService={placesService}
                  setClicker={setClicker}
                  nearByLocation={nearByLocation}
                  setNearByLocation={setNearByLocation}
                  startIcon={<RestaurantIcon />}
                  value={"Food"}
                  className={style.small_btn}
                />
              </div>
              <div class="grid-item">
                <SearchNearByBtn
                  map={map}
                  infowindow={infowindow}
                  placesService={placesService}
                  setClicker={setClicker}
                  nearByLocation={nearByLocation}
                  setNearByLocation={setNearByLocation}
                  startIcon={<BedIcon />}
                  value={"Hotel"}
                  className={style.small_btn}
                />
              </div>
              <div class="grid-item">
                <SearchNearByBtn
                  map={map}
                  infowindow={infowindow}
                  placesService={placesService}
                  setClicker={setClicker}
                  nearByLocation={nearByLocation}
                  setNearByLocation={setNearByLocation}
                  startIcon={<LocalBarIcon />}
                  value={"Drink"}
                  className={style.small_btn}
                />
              </div>
            </div>
            <div class="grid-container" className={style.grid_container}>
              <div class="grid-item">
                <SearchNearByBtn
                  map={map}
                  infowindow={infowindow}
                  placesService={placesService}
                  setClicker={setClicker}
                  nearByLocation={nearByLocation}
                  setNearByLocation={setNearByLocation}
                  startIcon={<CameraAltIcon />}
                  value={"Park"}
                  className={style.small_btn}
                />
              </div>
              <div class="grid-item">
                <SearchNearByBtn
                  map={map}
                  infowindow={infowindow}
                  placesService={placesService}
                  setClicker={setClicker}
                  nearByLocation={nearByLocation}
                  setNearByLocation={setNearByLocation}
                  startIcon={<ShoppingCartCheckoutIcon />}
                  value={"Shop"}
                  className={style.small_btn}
                />
              </div>
              <div class="grid-item">
                <SearchNearByBtn
                  map={map}
                  infowindow={infowindow}
                  placesService={placesService}
                  setClicker={setClicker}
                  nearByLocation={nearByLocation}
                  setNearByLocation={setNearByLocation}
                  startIcon={<SportsHandballIcon />}
                  value={"Sport"}
                  className={style.small_btn}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div class="grid-item"> */}
        {/* <FormControl className={style.grid_container}>
                <Box display="flex">
                <InputLabel className={style.inputRoot}>Num Travellers</InputLabel>
                <Select value={numTravellers} onChange={(e)=>setNumTravellers(e.target.value)} className={style.inputInput}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </Box>
                </FormControl>
            </div>
            {[...Array(numTravellers)].map((e, i) =>
              */}
        <FormControl>
          {/* Work on querySelector to getElementbyId for multipleids */}
          <InputLabel>Source location</InputLabel>
          <Input id="pac-input" type="text" className={style.inputInput} />
        </FormControl>
        <FormControl>
          <InputLabel>destination location</InputLabel>
          <Input id="pac-input-dest" type="text" className={style.inputInput} />
        </FormControl>
        <FormControl>
          <div class="grid-container" className={style.grid_container2}>
            <div class="grid-item">
              <Button
                onClick={handleChange}
                variant="contained"
                type="button"
                id="b3"
                value={"Find "}
                className={style.search}
              >
                Toggle Path
              </Button>
            </div>
            <div class="grid-item">
              <Button
                onClick={handleChange}
                variant="contained"
                type="button"
                id="b3"
                value={"Sport"}
                className={style.search}
              >
                Add Point
              </Button>
            </div>
          </div>
        </FormControl>
      </Card>
      {/* <Card
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingRight: "0px",
          paddingLeft: "0px",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          height: "40vh",
          overflow: "auto",
          maxHeight: "90vh",
          "& ul": { padding: 0 },
        }}
      >
        <TripHistory routes={routes} />
      </Card> */}
    </>
  );
};

export default InputForm;
