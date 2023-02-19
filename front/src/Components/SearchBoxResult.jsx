import "../static/App.css";

function SearchBoxResult({ data }) {
  return (
    <>
      {data.map((ele) => {
        return <li>{ele}</li>;
      })}
    </>
  );
}

export default SearchBoxResult;