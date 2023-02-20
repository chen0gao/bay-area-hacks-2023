import { searchNearBy } from "../gmapApi";
import { Button } from "@mui/material";

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
      Park: "park",
      Shop: "shop",
      Sport: "gym",
    };

    let color = {
      Food: "pink",
      Hotel: "yellow",
      Drink: "blue",
      Park: "green",
      Shop: "purple",
      Sport: "gray",
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
      <div class="grid-item">
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
      </div>
    </>
  );
}

export default SearchNearByBtn;
