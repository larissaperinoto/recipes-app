import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FavoriteAndShareButtons, InProgressCard } from '../components/index';
import Context from '../context/Context';

import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';

export default function RecipeInProgress() {
  const history = useHistory();
  const {
    recipeDetails: { details, ingredients },
    inProgressRecipes,
    doneRecipes,
    handleSendDone,
    generateTypeAndId,
    getIngredients,
    setInProgressRecipes,
    setRecipeDetails,
  } = useContext(Context);

  const { location: { pathname } } = history;
  const { type, id } = generateTypeAndId(pathname);

  useEffect(() => {
    const requestData = async (recipeType, recipeId) => {
      const data = recipeType === 'food'
        ? await requestMealWithId(recipeId) : await requestDrinkWithId(recipeId);
      const recomendationList = recipeType === 'food'
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

  useEffect(() => {
    if (inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }, [inProgressRecipes]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    if (doneRecipes.some((recipe) => recipe.id === id)) history.push('/done-recipes');
  }, [doneRecipes]);

  const saveRecipeId = (key) => {
    const indexSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (indexSaved && indexSaved[key][id]) {
      setInProgressRecipes({
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [...indexSaved[key][id]],
        },
      });
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [],
        },
      });
    }
  };

  useEffect(() => {
    if (type === 'drink' && !inProgressRecipes.cocktails[id]) saveRecipeId('cocktails');
    if (type === 'food' && !inProgressRecipes.meals[id]) saveRecipeId('meals');
  }, []);

  const finishRecipe = (key) => !(inProgressRecipes[key][id]
      && ingredients.length === inProgressRecipes[key][id].length);

  return (
    <div>
      <img
        src={ details.strMealThumb || details.strDrinkThumb }
        alt={ details.strMeal || details.strDrink }
      />
      <h2>{ details.strMeal || details.strDrink }</h2>
      <p>{details.strCategory}</p>
      <h3>Ingredients:</h3>
      <InProgressCard type={ type } id={ id } />
      <h3>Instructions:</h3>
      <p>{details.strInstructions}</p>
      <button
        type="button"
        disabled={ type === 'food' ? finishRecipe('meals') : finishRecipe('cocktails') }
        onClick={ () => handleSendDone(type, id) }
      >
        Finish Recipe
      </button>
      <FavoriteAndShareButtons
        type={ type }
        id={ id }
        testIdShare="share-btn"
        testIdFavorite="favorite-btn"
        replace="in-progress"
      />
    </div>
  );
}
