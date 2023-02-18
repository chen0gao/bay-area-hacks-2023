import Topbar from "../components/Topbar";
import RecipeMain from "../components/Recipe/RecipeMain.js";
import RecipeContent from "../components/Recipe/RecipeContent.js";
import SimilarRecipe from "../components/Recipe/SimilarRecipe";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRecipeById,
  getReviewsById,
  postComment,
  getSimilarRecipes,
} from "../fetcher.js";
import Loading from "../components/Progress";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Recipe() {
  const [recipe, setRecipe] = useState(0);
  const [recipes, setRecipes] = useState("");
  const [reviews, setReviews] = useState("");
  const [commentName, setCommentName] = useState([]);
  const [commentContent, setCommentContent] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { recipeId } = useParams();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  useEffect(() => {
    Promise.all([
      getRecipeById(recipeId),
      getSimilarRecipes(recipeId),
      getReviewsById(recipeId),
    ]).then(([singleRecipe, similarRecipes, totalReviews]) => {
      console.log(similarRecipes);
      setRecipe(singleRecipe);
      setRecipes(similarRecipes);
      setReviews(totalReviews);
      setLoaded(true);
    });
  }, [recipeId]);

  const [star, setStar] = React.useState(3);

  const submitComment = async () => {
    let id = recipeId;
    setOpen(true)

    await postComment({
      recipeId: id,
      name: document.querySelector("#comment-name").value,
      comment: document.querySelector("#comment-detail").value,
      star: star,
    });

    await getReviewsById(recipeId).then((res) => {
      setReviews(res);
    });
    setCommentName("");
    setCommentContent("");
  };

  return (
    <div>
      <Topbar />
      {loaded ? <RecipeMain recipe={recipe} /> : <Loading />}
      {loaded ? (
        <RecipeContent
          recipe={recipe}
          reviews={reviews}
          commentName={commentName}
          setCommentName={setCommentName}
          commentContent={commentContent}
          setCommentContent={setCommentContent}
          submitComment={submitComment}
          star={star}
          setStar={setStar}
        />
      ) : null}
      {loaded ? <SimilarRecipe recipes={recipes} /> : null}
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your comment is posted!
        </Alert>
      </Snackbar>
    </div>
  );
}
