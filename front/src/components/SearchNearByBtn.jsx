import { searchNearBy } from "../gmapApi";

function SearchNearByBtn({
  map,
  infowindow,
  placesService,
  setClicker,
  nearByLocation,
  setNearByLocation,
}) {
  function clickEvent() {
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
        query: "shop",
        markerColor: "yellow",
      }
    );
  }
  return (
    <>
      <button onClick={clickEvent}>Search NearBy Restaruant</button>
    </>
  );
}

export default SearchNearByBtn;
