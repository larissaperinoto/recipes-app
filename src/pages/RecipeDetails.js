import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import '../css/RecipeDetails.css';
import Context from '../context/Context';
import MealsDetails from '../components/MealsDetails';
import DrinkDetails from '../components/DrinkDetails';
import StartRecipeButton from '../components/StartRecipeButton';
import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';

function RecipeDetails({ history }) {
  const { setRecipeDetails } = useContext(Context);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const getIngredients = (data) => {
    const max = 30;
    const ingredients = [];
    for (let index = 1; index <= max; index += 1) {
      if (data[`strIngredient${index}`]) {
        const string = `${data[`strMeasure${index}`]} ${data[`strIngredient${index}`]}`;
        ingredients.push(string);
      }
    }
    return ingredients;
  };

  const handleStartRecipe = () => {
    if (type === 'foods') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
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

      { !doneRecipes && <StartRecipeButton handleStartRecipe={ handleStartRecipe } /> }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default RecipeDetails;
