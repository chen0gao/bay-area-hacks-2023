import "../css/main.css";
import "../css/css.css";
import "../css/css1.css";
import "uikit/dist/js/uikit.js";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../helper";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

export default function RecipeContent({recipe,reviews,commentName,setCommentName,commentContent,setCommentContent,submitComment,star,setStar,}) {
  //recipe instruction
  const instrunction_str = recipe[0].RecipeInstructions;
  const instructions = instrunction_str.substring(1, instrunction_str.length - 1).split("\n");
  //recipe ingredient
  const ingredients_str = recipe[0].ingredient;
  const ingredients = ingredients_str.substring(2, ingredients_str.length - 2).split('","');
  //recipe keywords
  const keywords_str = recipe[0].Keywords;
  const tags = keywords_str == "[None]"? [] : keywords_str.substring(2, keywords_str.length - 2).split("' '");

  const [reviewPage, setReviewPage] = useState([1]);

  const handleReviewPagination = (event, value) => {
    setReviewPage([value]);
  };

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value, ele) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <div class="uk-section uk-section-default">
      <div class="uk-container uk-container-small">
        <div class="uk-grid-large" data-uk-grid="">
          <div class="uk-width-expand@m">
            <div class="uk-article">
              <h3>How to Make It</h3>
              {instructions.map((value, index) => {
                value = value.trim().substring(1, value.length - 2);
                const labelId = `checkbox-list-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    // secondaryAction={
                    //   <IconButton edge="end" aria-label="comments">
                    //     <CommentIcon />
                    //   </IconButton>
                    // }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        class="listfont"
                        style={
                          checked.indexOf(value) !== -1
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                        id={labelId}
                        primary={`${index + 1}. ${value}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}

              <hr class="uk-margin-medium-top uk-margin-large-bottom" />
              <h3>Comments</h3>
              <ul class="uk-comment-list uk-margin-medium-top">
                <li>
                  <div>
                    {reviews
                      .filter((ele, i) => {
                        return i >= (reviewPage - 1) * 5 && i < reviewPage * 5;
                      })
                      .map((ele, index) => {
                        return (
                          <ul class="uk-comment-list uk-margin-medium-top">
                            <li>
                              <article
                                class="uk-comment uk-visible-toggle"
                                tabindex="-1"
                              >
                                <header class="uk-comment-header uk-position-relative">
                                  <div
                                    class="uk-grid-medium uk-flex-middle"
                                    data-uk-grid=""
                                  >
                                    <div class="uk-width-auto">
                                      <img
                                        class="uk-comment-avatar uk-border-circle"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU"
                                        width="50"
                                        height="50"
                                      />
                                    </div>
                                    <div class="uk-width-expand">
                                      <h4 class="uk-comment-title uk-margin-remove">
                                        <a class="uk-link-reset" href="#">
                                          {ele.AuthorName}
                                        </a>
                                      </h4>
                                      <p class="uk-comment-meta uk-margin-remove">
                                        <a class="uk-link-reset" href="#">
                                          {getFormattedDate(
                                            new Date(ele.DateSubmitted)
                                          ).substring(0,10)}
                                        </a>
                                      </p>
                                      <Rating
                                        name="Overall Rating"
                                        value={ele.Rating}
                                        precision={0.1}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </header>
                                <div class="uk-comment-body">
                                  <p>{ele.Review}</p>
                                </div>
                              </article>
                            </li>
                          </ul>
                        );
                      })}
                    {reviews.length > 0 ? (
                      <div class="uk-margin-large-top uk-text-small">
                        <Pagination
                          count={Math.ceil(reviews.length / 5)}
                          onChange={handleReviewPagination}
                          color="primary"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              </ul>
              <hr class="uk-margin-medium-top" />
              <h3>Leave your comment</h3>
              <div class="comment-box">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "25ch" }}
                  id="comment-name"
                  label="Name"
                  placeholder="Leave your name..."
                  variant="outlined"
                  value={commentName}
                  onChange={(event, newValue) => {
                    setCommentName(newValue);
                  }}
                />
                <div class="comment-box-star">
                  Rating:
                  <Rating
                    name="simple-controlled"
                    value={star}
                    onChange={(event, newValue) => {
                      setStar(newValue);
                    }}
                  />
                </div>
                <div class="uk-margin-medium-bottom">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="comment-detail"
                  label="Comment"
                  placeholder="Leave your comment..."
                  value={commentContent}
                  onChange={(event, newValue) => {
                    setCommentContent(newValue);
                  }}
                  multiline
                />
              </div>
              <Button style={{width: "100px"}} onClick={submitComment} variant="contained">
                Submit
              </Button>
              </div>
              
            </div>
          </div>
          <div class="uk-width-1-3@m">
            <h3>Ingredients</h3>
            <ul class="uk-list uk-list-small uk-list-divider uk-margin-medium-top">
              {ingredients.map((value, index) => {
                value = value.trim();
                const labelId = `checkbox-list-label-${value}`;
                if (value.length < 1) {
                  return null;
                } else {
                  return (
                    <ListItem
                      key={value}
                      // secondaryAction={
                      //   <IconButton edge="end" aria-label="comments">
                      //     <CommentIcon />
                      //   </IconButton>
                      // }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          class="listfont"
                          style={
                            checked.indexOf(value) !== -1
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                          id={labelId}
                          primary={`${value}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              })}
            </ul>
            <h3 class="uk-margin-large-top">Tags</h3>
            <div class="uk-margin-medium-top" data-uk-margin="">
              {tags.map((tag) => (
                <a class="uk-display-inline-block" href="#">
                  <Link to={`/Search/${tag}`}>
                    <span class="uk-label uk-label-light">
                      {tag.replace(/'(.*?)'/g)}
                    </span>
                  </Link>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
