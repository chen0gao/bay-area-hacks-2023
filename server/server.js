const express = require("express");
const mysql = require("mysql");
var cors = require("cors");
const port = process.env.PORT || 3000;
const routes = require("./routes");

const config = require("./config.json");
const app = express();

// whitelist localhost 3000
app.use(express.json())
app.use(cors({ credentials: false, origin: ["http://localhost:3000"] }));

//main app page
app.get("/", (req, res) => {
    res.send("Hungry Time");
});
//recipe page
// app.get('/recipes', routes.recipes)
app.get("/recipes", routes.recipes);
app.get("/recipe/:recipeId", routes.recipe);
app.get("/recipes/:choice", routes.recipes);
//pageTwo
app.get("/pageTwo", routes.pageTwo);

app.get("/reviews/:recipeId", routes.reviews);

//Search Page
app.get("/search/", routes.search);
app.get("/search/:keyword", routes.search);
app.get("/searchcount/", routes.searchCount);
app.get("/searchcount/:keyword", routes.searchCount);
app.get("/homePage_RecentlyPopular", routes.homePage_RecentlyPopular);
app.get("/homePage_TodaySelected", routes.homePage_TodaySelected);

//complex query
app.get("/recommendation/:recipeId", routes.recommendation);

//Post event
app.post("/postComment", routes.postComment);

app.listen(config.server_port, () => {
    console.log(
        `Server running at http://${config.server_host}:${config.server_port}/`
    );
});






module.exports = app;
