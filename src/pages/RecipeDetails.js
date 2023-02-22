import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Context from '../context/Context';
import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';

import { StartRecipeButton,
  FavoriteAndShareButtons,
  Slider,
  Details } from '../components';

export default function RecipeDetails() {
  const { getIngredients, setRecipeDetails, generateTypeAndId } = useContext(Context);

  const { location: { pathname } } = useHistory();
  const { type, id } = generateTypeAndId(pathname);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  useEffect(() => {
    const requestData = async (recipeType, itemId) => {
      const data = recipeType === 'food'
        ? await requestMealWithId(itemId) : await requestDrinkWithId(itemId);
      const recomendationList = type === 'food'
        ? await requestDrinksRecomendation() : await requestFoodsRecomendation();
      const ingredientsList = getIngredients(data[0]);
      setRecipeDetails({
        details: data[0],
        ingredients: ingredientsList,
        recomendations: recomendationList,
      });
    };
    requestData(type, id);
  }, [id, type]);

  return (
    <main>
      <Details />
      <FavoriteAndShareButtons
        type={ type }
        id={ id }
        testIdShare="share-btn"
        testIdFavorite="favorite-btn"
        replace="in-progress"
      />
      <Slider />

      { !doneRecipes.some((recipe) => Number(recipe.id) === Number(id))
        && <StartRecipeButton
          objectKey={ type === 'food' ? 'meals' : 'cocktails' }
          id={ id }
        /> }
    </main>
  );
}
