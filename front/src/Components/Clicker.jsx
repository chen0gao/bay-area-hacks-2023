function Clicker({ clicker, setLocations }) {
  function clickEvent() {
    console.log(clicker);
    setLocations((locations) => [...locations, clicker]);
  }
  return (
    <>
      <button onClick={clickEvent}>Add current point to location</button>
    </>
  );
}

export default Clicker;
