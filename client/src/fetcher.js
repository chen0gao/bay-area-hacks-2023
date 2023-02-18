import { config } from './config';

const getRecipes = async (choice) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/recipes/${choice}`, {
    method: 'GET',
  })
  return res.json()
}

const getDefaultRecipes = async () => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/recipes`, {
    method: 'GET',
  })
  return res.json()
}

const getSimilarRecipes = async (recipeId) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/recommendation/${recipeId}`, {
    method: 'GET',
  })
  return res.json();
}

const getFoodSearch = async (keyword, page, pagesize, sort, tag) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/${keyword}?page=${page}&pagesize=${pagesize}&sort=${sort}&tag=${tag}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getFoodSearchCount = async (keyword, tag) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/searchcount/${keyword}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getRecipeById = async (recipeId) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/recipe/${recipeId}`, {
    method: 'GET',
  })
  return res.json()
}

const getReviewsById = async (recipeId) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/reviews/${recipeId}`, {
    method: 'GET',
  })
  return res.json()
}

const homePage_RecentlyPopular = async () => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/homePage_RecentlyPopular`, {
    method: 'GET',
  })
  return res.json()
}

const homePage_TodaySelected = async () => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/homePage_TodaySelected`, {
    method: 'GET',
  })
  return res.json()
}

const postComment = async (data) => {
  // console.log(data)
  var res = await fetch(`http://${config.server_host}:${config.server_port}/postComment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  // console.log(res)
  return res.json()
}

export { getFoodSearch, getFoodSearchCount, getRecipeById, getReviewsById, homePage_RecentlyPopular, homePage_TodaySelected, postComment };
export { getDefaultRecipes, getSimilarRecipes, getRecipes };