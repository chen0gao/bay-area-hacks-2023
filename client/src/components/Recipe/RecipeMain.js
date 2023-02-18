import "../css/main.css";
import "../css/css.css";
import "../css/css1.css";
import "uikit/dist/js/uikit.js";
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import React from 'react';
import { CardContent, CardActionArea, Typography, Modal, Divider, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';

export default function RecipeMain({ recipe }) {
  const imgs = recipe[0].Images.split("\n");
  
  const indexImg = imgs.length - 1 > 1 ? 1 : 0

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 2,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div class="uk-container">
      <div data-uk-grid="">
        <div class="uk-width-1-2@s">
          <div>
            <Card sx={{ maxHeight: 650, maxWidth: 550 }}>
              <CardActionArea>
                <CardContent>
                <Carousel autoPlay showIndicators={false}>
                  {imgs.map((img, index) => {
                    return (
                      <div>
                    <img src={img.replace(/[\[\]']+/g, '')} />
                    {/* <p className="legend">Legend {index}</p> */}
                      </div>
                      // <CarouselSlide key={index} autoPlay="true" interval="1000">
                      //   <CardMedia
                      //     component="img"
                      //     height="200"
                      //     // imgs[1].replace(/'/g, "")
                      //     image={img.replace(/[\[\]']+/g, '')}
                      //     alt="food pic"
                      //     width="60%"
                      //   />
                      // </CarouselSlide>
                      )
                  }
                  )}
                </Carousel>
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Rating name="Overall Rating" value={recipe[0].AggregatedRating} precision={0.1} readOnly />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Modal
              open={show}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ backdropFilter: "blur(5px)" }}
            >
              <Card sx={{ ...style, width: 200 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Nutritional Facts
                </Typography>
                <Divider />
                <List id="modal-modal-description" sx={{ mt: 2 }}>
                  <ListItem>
                    <ListItemText primary={`Calories: ${recipe[0].Calories} kCal`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Fat: ${recipe[0].FatContent} g`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Cholestrol: ${recipe[0].CholesterolContent} mg`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Sodium: ${recipe[0].SodiumContent} mg`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Sugar: ${recipe[0].SugarContent} g`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Fiber: ${recipe[0].FiberContent} g`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Protein: ${recipe[0].ProteinContent} g`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Carbohydrate: ${recipe[0].CarbohydrateContent} g`} />
                  </ListItem>
                </List>
              </Card>
            </Modal>
          </div>
        </div>
        <div class="uk-width-expand@s uk-flex uk-flex-middle">
          <div onClick={handleOpen}>
            <Tooltip title="Click to see nutritional fact">
              <h1>{recipe[0].Name}</h1>
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              {recipe[0].Description}
            </Typography>
            <div
              class="uk-margin-medium-top uk-child-width-expand uk-text-center uk-grid-divider"
              data-uk-grid=""
            >
              <div>
                <span data-uk-icon="icon: clock; ratio: 1.4"></span>
                <h5 class="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">
                  Prep Time
                </h5>
                <span class="uk-text-small">{recipe[0].PrepTime.split(":")[1]} mins</span>
              </div>
              <div>
                <span data-uk-icon="icon: future; ratio: 1.4"></span>
                <h5 class="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">
                  Total Time
                </h5>
                <span class="uk-text-small">{recipe[0].TotalTime.split(":")[1]} mins</span>
              </div>
              <div>
                <span data-uk-icon="icon: users; ratio: 1.4"></span>
                <h5 class="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">
                  Yield
                </h5>
                <span class="uk-text-small">{recipe[0].RecipeServing ? "Serves " + recipe[0].RecipeServings : "unknown"}</span>
              </div>
            </div>
            <hr />
            <div data-uk-grid="">
              <div class="uk-width-auto@s uk-text-small">
                <span class="uk-label">{recipe[0].RecipeCategory}</span>
                <p class="uk-margin-small-top uk-margin-remove-bottom">
                  Created by <span>{recipe[0].AuthorName}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
