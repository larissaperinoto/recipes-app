import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Context from '../context/Context';
import HeaderContext from '../context/HeaderContext';
import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';
import MealsDetails from '../components/MealsDetails';
import DrinkDetails from '../components/DrinkDetails';

function RecipeDetails({ history }) {
  const { setRecipeDetails } = useContext(Context);
  const { recipeId: { type } } = useContext(HeaderContext);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];

  const getIngredients = (data) => {
    const max = 30;
    const ingredient = [];
    for (let index = 1; index <= max; index += 1) {
      if (data[`strIngredient${index}`]) ingredient.push(data[`strIngredient${index}`]);
    }
    return ingredient;
  };

  useEffect(() => {
    const requestData = async () => {
      const data = type === 'foods'
        ? await requestMealWithId(id) : await requestDrinkWithId(id);
      const recomendationList = type === 'foods'
        ? await requestDrinksRecomendation() : await requestFoodsRecomendation();
      const ingredientsList = getIngredients(data[0]);
      setRecipeDetails({
        details: data[0],
        ingredients: ingredientsList,
        recomendations: recomendationList,
      });
    };
    requestData();
  }, []);

  return (
    <div>
      { type === 'foods'
        ? <MealsDetails />
        : <DrinkDetails /> }
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default RecipeDetails;
