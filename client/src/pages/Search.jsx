import Topbar from "../components/Topbar";
import Bottombar from "../components/Bottombar";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { getFoodSearch, getFoodSearchCount } from "../fetcher";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ItemGrid from "../components/Search/ItemGrid";
import dummy from "../components/dummy.json";
import Loading from "../components/Progress";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Search() {
  const { keywords } = useParams();
  const [foodSort, setFoodSort] = useState([1]);
  const [food, setFood] = useState([keywords == null ? "" : keywords]);

  const [resultCount, setResultCount] = useState();
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  // const [result, setResult] = useState(Array(12).fill(dummy.search));

  useEffect(() => {
    getFoodSearchCount(food, "").then((res) => {
      setResultCount(res[0].Total);
    });

    getFoodSearch(food, 1, 12, foodSort, "").then((res) => {
      if(res.length==0) {
        setResult(null);
      } else {
        setResult(res);
      }
    });
  }, []);

  const handleSearch = (event, value) => {
      setResult([]);
    console.log("Running Search");
    getFoodSearchCount(food, "").then((res) => {
      // console.log(res);
      setResultCount(res[0].Total);
    });
    getFoodSearch(food, 1, 12, foodSort, "").then((res) => {
      // console.log(res);
      if(res.length==0) {
        setResult(null);
      } else {
        setResult(res);
      }
    });
    navigate(`/Search/${food}`);
  };

  const handlePagination = (event, value) => {
      setResult([]);
    getFoodSearch(food, value, 12, foodSort, '').then((res) => {
      // console.log(res);
      if(res.length==0) {
        setResult(null);
      } else {
        setResult(res);
      }
    });
  };
  const handleSort = (event, target) => {
    setFoodSort(target.props.value);
    getFoodSearch(food, 1, 12, target.props.value, "").then((res) => {
      if(res.length==0) {
        setResult(null);
      } else {
        setResult(res);
      }
    });
  };

  const handleClick = (key) => {
    console.log("Clicked: " + key);
  };

  return (
    <div>
      <Topbar />
      <div class="uk-section uk-section-default uk-padding-remove-top">
        <div class="uk-container">
          <div data-uk-grid="">
            <div class="uk-width-1-2@m">
              <form>
                <TextField
                  id="search-bar"
                  className="text"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSearch();
                    }
                  }}
                  onInput={(event, value) => {
                    setFood(event.target.value);
                    // console.log(event.target.value);
                  }}
                  label="Enter a food name"
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon onClick={handleSearch} />
                </IconButton>
              </form>
            </div>
            <div class="uk-width-1-2@m uk-text-right@m">
              <Box sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={foodSort}
                  // label="Sort by:"
                  onChange={handleSort}
                >
                  <MenuItem value={1}>Latest</MenuItem>
                  <MenuItem value={2}>Top Rated</MenuItem>
                  <MenuItem value={3}>Trending</MenuItem>
                </Select>
              </Box>
            </div>
          </div>
          <div>
            <h3 class="uk-text-500 uk-margin-small-bottom uk-margin-top">
              {resultCount} results
            </h3>
          </div>
          <div
            class="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-margin-medium-top"
            data-uk-grid=""
          >
            {result != null && result.length > 0 ? (
              result.map((ele, index) => {
                return (
                  <Link to={`/recipe/${ele.RecipeId}`}>
                    <ItemGrid
                      key={index}
                      // onClick={()=>handleClick(index)}
                      name={ele.Name}
                      image={ele.Images}
                      rating={
                        ele.AvgRating == null
                          ? 0
                          : Number(ele.AvgRating).toFixed(1)
                      }
                      comment={ele.Comment}
                      date={ele.Date}
                      author={ele.AuthorName}
                    />
                  </Link>
                );
              })
            ) : (
                result != null ?
              <Loading /> : <b>No Recipe Found</b>
            )}
          </div>
          <div class="uk-margin-large-top uk-text-small">
            <Pagination
              count={Math.ceil(resultCount / 12)}
              onChange={handlePagination}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
