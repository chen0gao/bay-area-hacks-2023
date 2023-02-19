function SearchBoxResult({ data }) {
  return (
    <>
      {data.map((ele) => {
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
