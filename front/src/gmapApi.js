module.exports = {
  // Example
  // createRoute(render2, service2, {
  //   color: "green",
  //   origin: {
  //     location: new window.google.maps.LatLng(40.7825547, -73.9655834),
  //   },
  //   destination: {
  //     location: new window.google.maps.LatLng(40.8035812, -73.9636934),
  //   },
  //   waypoints: [
  //     {
  //       location: new window.google.maps.LatLng(40.8075355, -73.9625727),
  //       stopover: true,
  //     },
  //   ],
  //   travelMode: window.google.maps.TravelMode.DRIVING,
  // });
  createRoute: function (render, service, route) {
    render.setOptions({
      polylineOptions: {
        strokeColor: route.color,
      },
    });
    service
      .route({
        origin: route.origin,
        destination: route.destination,
        waypoints: route.waypoints,
        optimizeWaypoints: true,
        travelMode: route.travelMode,
      })
      .then((response) => {
        console.log(response);
        render.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));
  },

  //Near by search
  //https://www.developers.google.com/maps/documentation/javascript/places#TextSearchRequests
  searchNearBy: function (
    map,
    infowindow,
    service,
    setClicker,
    nearByLocation,
    setNearByLocation,
    config
  ) {
    //Clear previous location
    if (nearByLocation != null && nearByLocation.length > 0) {
      for (let m of nearByLocation) {
        m.setMap(null);
      }
    }
    const pyrmont = new window.google.maps.LatLng(
      config.location.lat,
      config.location.lng
    );
    var request = {
      location: pyrmont,
      //   radius: config.radius,
      rankBy: window.google.maps.places.RankBy.DISTANCE,
      query: config.query,
    };

    let curLocationList = [];
    service.textSearch(request, (results, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if (i >= config.max) break;
          let place = results[i];
          // console.log(place);
          // console.log(place.geometry.location);

          // https://stackoverflow.com/questions/74190075/is-there-a-way-to-change-default-marker-color
          let marker = new window.google.maps.Marker({
            map: map,
            placeId: results[i].place_id,
            position: place.geometry.location,
            icon: {
              path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
              fillColor: config.markerColor,
              fillOpacity: 1,
              strokeColor: "#000",
              strokeWeight: 2,
              scale: 1,
            },
          });

          curLocationList.push(marker);

          window.google.maps.event.addListener(marker, "click", () => {
            setClicker({
              name: place.name,
              lat: place.geometry.location.toJSON().lat,
              lng: place.geometry.location.toJSON().lng,
            });
            // console.log(place);
            infowindow.close();
            infowindow.setPosition(place.geometry.location);
            infowindow.setContent(place.name || "");
            infowindow.open(map);
          });
        }

        setNearByLocation(curLocationList);
      }
    });
  },
};
