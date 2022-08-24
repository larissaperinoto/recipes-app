import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Context from '../context/Context';
import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';
import MealsDetails from '../components/MealsDetails';
import DrinkDetails from '../components/DrinkDetails';

function RecipeDetails({ history }) {
  const { setRecipeDetails } = useContext(Context);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  const getIngredients = (data) => {
    const max = 30;
    const ingredient = [];
    for (let index = 1; index <= max; index += 1) {
      if (data[`strIngredient${index}`]) {
        const string = `${data[`strMeasure${index}`]} ${data[`strIngredient${index}`]}`;
        ingredient.push(string);
      }
    }
    return ingredient;
  };

  const handleStartRecipe = () => {
    history.push(`/foods/${id}/in-progress`);
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
  }, [id, type]);

  return (
    <div>
      { type === 'foods'
        ? <MealsDetails />
        : <DrinkDetails /> }
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
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
