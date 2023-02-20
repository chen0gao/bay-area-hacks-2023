function AddLocation({ clicker, index, routes, setRoutes }) {
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
      <button onClick={clickEvent}>Add current point to location</button>
    </>
  );
}

export default AddLocation;
