function SearchBoxResult({ index, routes }) {
  return (
    <>
      {routes[index] &&
        routes[index].locations.map((ele) => {
          return (
            <li>
              Name: {ele.name}
              Lat: {ele.lat}
              Lon: {ele.lng}
            </li>
          );
        })}
    </>
  );
}

export default SearchBoxResult;
