import "../css/main.css";
import "../css/css.css";
import "../css/css1.css";
import "../css/itemGrid.css";
import "uikit/dist/js/uikit.js";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {getFormattedDate} from "../helper";

export default function ItemGrid({ name, image, rating, comment, author, date}) {
  return (
    <div>
      <div class="uk-card">
        <div class="uk-card-media-top uk-inline uk-light">
          <img
            class="uk-border-rounded-medium"
            src={image.split("'")[1]}
            alt="Course Title"
          />
          <div class="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
        </div>
        <div>
          <h3 style={{textAlign: "center"}} class="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">
            {name}
          </h3>
          <div class="uk-text-xsmall uk-text-muted" data-uk-grid="">
            <div style={{left: "0px", position: "absolute", paddingLeft: "5px"}} class="uk-width-auto uk-flex uk-flex-middle">
              <StarRoundedIcon fontSize="small" color="warning"/>
              <span class="uk-margin-xsmall-left">{rating}</span>
              <span>({comment})</span>
            </div>
            <div style={{right: "0px", position: "absolute", paddingRight: "5px"}}>
              <div class="uk-width-expand uk-text-right">by {author}</div>
              <div class="uk-width-expand uk-text-right">({getFormattedDate(new Date(date))})</div>
            </div>
          </div>
        </div>
        <a href="recipe.html" class="uk-position-cover"></a>
      </div>
    </div>
  );
}
