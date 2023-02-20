import { searchNearBy } from "../gmapApi";
import { Button } from "@material-ui/core";

function SearchNearByBtn({
  map,
  infowindow,
  placesService,
  setClicker,
  nearByLocation,
  setNearByLocation,
  startIcon,
  value,
}) {
  function clickEvent() {
    let type = {
      Food: "restaurant",
      Hotel: "hotel",
      Drink: "bar",
      Site: "Park",
      Shop: "shop",
      Sport: "gym",
    };
    let color = {
      Food: "red",
      Hotel: "yellow",
      Drink: "blue",
      Site: "green",
      Shop: "pink",
      Sport: "purple",
    };
    searchNearBy(
      map,
      infowindow,
      placesService,
      setClicker,
      nearByLocation,
      setNearByLocation,
      {
        location: { lat: map.getCenter().lat(), lng: map.getCenter().lng() },
        // radius: 10,
        max: 10,
        query: type[value],
        markerColor: color[value],
      }
    );
  }
  return (
    <>
      <Button
        onClick={clickEvent}
        variant="contained"
        startIcon={startIcon}
        type="button"
        id="b2"
        value={value}
      >
        {value}
      </Button>
    </>
  );
}

export default SearchNearByBtn;
