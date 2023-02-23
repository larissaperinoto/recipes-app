import { Button, Container, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeInProgress.css';

import { FavoriteAndShareButtons, InProgressCard } from '../components/index';
import Context from '../context/Context';

export default function RecipeInProgress() {
  const history = useHistory();
  const {
    recipeDetails: { details },
    inProgressRecipes,
    doneRecipes,
    handleSendDone,
    generateTypeAndId,
    requestData,
    saveRecipeId,
    finishRecipe,
  } = useContext(Context);

  const { location: { pathname } } = history;
  const { type, id } = generateTypeAndId(pathname);

  useEffect(() => {
    requestData(type, id);
  }, [id, type]);

  useEffect(() => {
    if (inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }, [inProgressRecipes]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    if (doneRecipes.some((recipe) => recipe.id === id)) history.push('/done-recipes');
  }, [doneRecipes]);

  useEffect(() => {
    if (type === 'drink' && !inProgressRecipes.cocktails[id]) saveRecipeId('cocktails');
    if (type === 'food' && !inProgressRecipes.meals[id]) saveRecipeId('meals');
  }, []);

  return (
    <Container className="recipeInProgress_container">
      <img
        src={ details.strMealThumb || details.strDrinkThumb }
        alt={ details.strMeal || details.strDrink }
      />
      <Typography variant="h3">{ details.strMeal || details.strDrink }</Typography>
      <Typography>{details.strCategory}</Typography>
      <FavoriteAndShareButtons
        type={ type }
        id={ id }
        testIdShare="share-btn"
        testIdFavorite="favorite-btn"
        replace="in-progress"
      />
      <Typography variant="h5">Ingredients:</Typography>
      <InProgressCard type={ type } id={ id } />
      <Typography variant="h5">Instructions:</Typography>
      <Typography sx={ { textAlign: 'justify' } }>{details.strInstructions}</Typography>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        sx={ { m: 3 } }
        disabled={ type === 'food' ? finishRecipe('meals') : finishRecipe('cocktails') }
        onClick={ () => handleSendDone(type, id) }
      >
        Finish Recipe
      </Button>
    </Container>
  );
}
