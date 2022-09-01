import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import '../css/RecipeDetails.css';
import Context from '../context/Context';
import {
  MealsDetails,
  DrinkDetails,
  StartRecipeButton,
  FavoriteAndShareButtons,
  Slider } from '../components/index';

function RecipeDetails({ history }) {
  const { requestData, recipeDetails: { recomendations } } = useContext(Context);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1].split('s')[0];

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const handleStartRecipe = () => {
    if (type === 'food') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  useEffect(() => {
    requestData(type, id);
  }, [id, type]);

  return (
    <div>
      { type === 'food'
        ? <MealsDetails />
        : <DrinkDetails /> }
      <FavoriteAndShareButtons
        type={ type }
        id={ id }
        testIdShare="share-btn"
        testIdFavorite="favorite-btn"
        replace="in-progress"
      />
      <div>
        { recomendations && <Slider /> }
      </div>

      { !doneRecipes.some((recipe) => Number(recipe.id) === Number(id))
        && <StartRecipeButton handleStartRecipe={ handleStartRecipe } /> }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default RecipeDetails;
