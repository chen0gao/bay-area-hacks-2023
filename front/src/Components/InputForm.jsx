import {Button, InputUnstyled, InputLabel, MenuItem, FormControl, Select, Box, Card, Input, Grid } from "@material-ui/core";
import { Tab } from '@mui/material'
import { TabContext, TabList, TabPanel} from '@mui/lab'
import useState from "react";
import styles from "./Header/styles";
import useStyles from './Header/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BedIcon from '@mui/icons-material/Bed';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';



// import { IconButton } from '@mui/material';

const InputForm = ({ numTravellers, setNumTravellers, businessType, setBusinessType}) => { 
    const style = useStyles();
    const handleChange = (e) => setBusinessType(e.target.value)
    console.log(businessType);
    console.log(numTravellers)
    
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
        <Card variant="outlined" className = {style.overFlow}>
              <div id = "container">
                <div id = "first">
                    <div class="grid-container" className={ style.grid_container}>
                            <div class="grid-item">
                                <Button onClick={handleChange} startIcon={<RestaurantIcon />} variant="contained" type="button" id="b1" value={"Food"} className = {style.small_btn}>Food</Button>
                         </div>
                        <div class="grid-item">
                            <Button onClick={ handleChange} variant="contained" startIcon={ <BedIcon/>} type = "button" id = "b2" value={"Hotel"} className = {style.small_btn}>Hotel</Button>
                        </div>
                        <div class="grid-item">
                            <Button onClick={ handleChange} variant="contained" startIcon={ <LocalBarIcon/>} type = "button" id = "b3" value={"Drink"} className = {style.small_btn}>Drink</Button>
                        </div>
                    </div>
                    <div class="grid-container" className={ style.grid_container}>
                        <div class="grid-item">
                            <Button onClick={ handleChange} variant="contained" startIcon={ <CameraAltIcon/>} type = "button" id = "b1" value={"Site"} className = {style.small_btn}>Site</Button>
                         </div>
                        <div class="grid-item">
                            <Button onClick={ handleChange} variant="contained" startIcon={ <ShoppingCartCheckoutIcon/>} type = "button" id = "b2" value={"Shop"} className = {style.small_btn}>Shop</Button>
                        </div>
                        <div class="grid-item">
                                <Button onClick={handleChange} variant="contained" startIcon={<SportsHandballIcon />} type="button" id="b3" value={ "Sport"} className = {style.small_btn}>Sport</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-item">
            <FormControl className={style.grid_container}>
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
                <FormControl>
                    {/* Work on querySelector to getElementbyId for multipleids */}
                    <InputLabel>Source Location {i + 1}</InputLabel>
                    <Input id="pac-input" type="text"  className={style.inputInput} />
                </FormControl>)
                }
            <FormControl>
                 <InputLabel>destination Location</InputLabel>
                <Input id="pac-input-dest" type="text" className={style.inputInput}/>
            </FormControl>
            </Card>
            </>
    );
}

export default InputForm;