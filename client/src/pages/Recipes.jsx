import Topbar from "../components/Topbar";
import React, { useState, useEffect} from "react";
import { getRecipes } from "../fetcher";
import { Link } from "react-router-dom";
import ItemGrid from "../components/Search/ItemGrid";
import Loading from "../components/Progress";

export default function Recipes() {

  const recipesType = ["Breakfast & Brunch", "Lunch", "Appetizers & Snack", "Dinner", "Dessert", "Drink & Cocktail",
                    "Side Dish", "Grilling & BBQ", "Microwave", "Quick & Easy", "Slow-Cooker", "Air Fryer", "Instant Pot",
                    "Baking"];
  const healthyAndDietType = ["Keto", "Healthy", "Vegetarian", "Vegan", "Mediterranean", "Weight Watchers",
                              "Low-Carb", "Gluten-Free"];
  const worldCusineType = ["Mexican", "Italian", "Indian", "Thai", "Korean", "French", "Chinese", "Japanese", "Spanish","Brazilian"]; 
  const seasonalType = ["Spring", "Summer", "Fall", "Winter"];
  const holidayType = ["Valentine's Day", "St. Patrick's Day", "Easter", "Mother's Day", "Memorial Day", "4th of July",
                        "Halloween", "Thanksgiving", "Christmas", "New Year's"]
  const specialOccasionsType = ["Dinner Party", "Game Day", "Baby Shower", "Wedding", "Birthday Party", "Graduation"]
  const [choice, setChoice] = useState("Breakfast");
  const [selection, setSelection] = useState("Breakfast");
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //handleClick -> onClick -> setChoice
  const handleClick = (type) => {
    if (type.includes("\'"))
      setChoice(type.split('\'')[0]);
    else if (type.includes("&"))
      setChoice(type.split('&')[0].trim());
    else
      setChoice(type);
    setSelection(type);
  }

  useEffect(() => {
    if(choice)
    getRecipes(choice).then((selectedRecipes) => {
        console.log(selectedRecipes)
      setRecipes(selectedRecipes);
      setLoaded(true);
      })
  }, [choice]);

  return (
    <div>
      <Topbar/>
      <div class="uk-section uk-section-default uk-padding-remove-top">
      <div class="uk-container">
        <div data-uk-grid="">
          <div class="uk-width-1-4@m sticky-container">
            <div data-uk-sticky="offset: 100; bottom: true; media: @m;">
              <h2>Recipes</h2>
              <ul
                class="uk-nav-default uk-nav-parent-icon uk-nav-filter uk-margin-small-top"
                data-uk-nav=""
              >
                <li class="uk-parent">
                  <a href="javascript:void(0);">Recipes</a>
                  <ul class="uk-nav-sub">
                    {recipesType.map(function(type,index){
                      return <li key={index} onClick={()=>handleClick(type)}><a href ="javascript:void(0);">{type} Recipes</a></li>
                    })}
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="javascript:void(0);">Healthy and Diet</a>
                  <ul class="uk-nav-sub">
                    {healthyAndDietType.map(function(healthyAndDietType,index){
                        return <li key = {index} onClick={()=>handleClick(healthyAndDietType)}><a href ="javascript:void(0);">{healthyAndDietType} Recipes</a></li>
                      })}
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="javascript:void(0);">Holidays</a>
                  <ul class="uk-nav-sub">
                    {holidayType.map(function(holidayType,index){
                          return <li key = {index} onClick={()=>handleClick(holidayType)}><a href ="javascript:void(0);">{holidayType} Recipes</a></li>
                        })}
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="javascript:void(0);">World Cuisine</a>
                  <ul class="uk-nav-sub">
                    {worldCusineType.map(function(worldCusineType,index){
                          return <li key = {index} onClick={()=>handleClick(worldCusineType)}><a href ="javascript:void(0);">{worldCusineType} Recipes</a></li>
                        })}
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="javascript:void(0);">Seasonal</a>
                  <ul class="uk-nav-sub">
                    {seasonalType.map(function(seasonalType,index){
                            return <li key = {index} onClick={()=>handleClick(seasonalType)}><a href ="javascript:void(0);">{seasonalType} Recipes</a></li>
                          })}
                  </ul>
                </li>
                <li class="uk-parent">
                  <a href="javascript:void(0);">Special Occasions</a>
                  <ul class="uk-nav-sub">
                    {specialOccasionsType.map(function(specialOccasionsType,index){
                            return <li key = {index} onClick={()=>handleClick(specialOccasionsType)}><a href ="javascript:void(0);">{specialOccasionsType} Recipes</a></li>
                          })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="uk-width-expand@m uk-margin-medium-top">
            <div class="uk-text-large uk-text-bold uk-margin-small-bottom uk-margin-top">
                Top {selection} recipes
            </div>
            <div
              class="uk-child-width-1-2 uk-child-width-1-3@s"
              data-uk-grid=""
            >
                {(!loaded) ? (<Loading />) :
                  (recipes.length === 0) ?
                    (<b>No Recipe Found</b>) :
                  (recipes.map((ele, index) => {
                  return (
                    <Link to={`/recipe/${ele.RecipeId}`}>
                      <ItemGrid
                    key={index}
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
                }))}

            {/*pagination needed below code, otherwise delete */}
            {/* <div class="uk-margin-large-top uk-text-small">
              <ul
                class="uk-pagination uk-flex-center uk-text-500 uk-margin-remove"
                data-uk-margin=""
              >
                <li>
                  <a href="#"><span data-uk-pagination-previous=""></span></a>
                </li>
                <li><a href="#">1</a></li>
                <li class="uk-active"><span>2</span></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li>
                  <a href="#"><span data-uk-pagination-next=""></span></a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
      </div>
      </div>
  );
}