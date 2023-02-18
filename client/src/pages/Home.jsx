import Topbar from "../components/Topbar";
import Carousel from "../components/Carousel";
import ItemGrid from "../components/Search/ItemGrid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { homePage_RecentlyPopular, homePage_TodaySelected } from "../fetcher";
export default function Home() {
  const [recently, setRecently] = useState([]);
  const [today, setToday] = useState([]);

  useEffect(() => {
    homePage_RecentlyPopular().then((res) => {
      setRecently(res);
    });
    homePage_TodaySelected().then((res) => {
      setToday(res);
    });
  }, []);

  return (
    <div>
      <Topbar />
      <Carousel />
      <div class="uk-section uk-section-default">
        <div class="uk-container uk-container-small">
          <div class="uk-grid-large" data-uk-grid="">
            <div class="uk-width-expand@m">
              <div class="uk-article">
                <h3>Recently Popular</h3>
                <div
                  class="uk-child-width-1-2 uk-child-width-1-4@s"
                  data-uk-grid=""
                >
                  {recently.map((ele, index) => {
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
                  })}
                </div>
              </div>

              <div class="uk-article">
                <h3>Today's Selected</h3>
                <div
                  class="uk-child-width-1-2 uk-child-width-1-4@s"
                  data-uk-grid=""
                >
                  {today.map((ele, index) => {
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
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
