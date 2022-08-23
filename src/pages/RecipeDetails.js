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
  const {
    recipeType,
    recipeDetails,
    setRecipeDetails,
    setRecipeIngredients,
    setRecomendations,
  } = useContext(Context);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];

  const getIngredients = () => {
    const max = 30;
    const ingredient = [];
    for (let index = 1; index <= max; index += 1) {
      if (recipeDetails[`strIngredient${index}`]) {
        ingredient.push(recipeDetails[`strIngredient${index}`]);
      }
    }
    setRecipeIngredients(ingredient);
  };

  useEffect(() => {
    getIngredients();
  }, [recipeDetails]);

  useEffect(() => {
    const requestData = async () => {
      if (recipeType === 'foods') {
        const data = await requestMealWithId(id);
        const recomendationList = await requestDrinksRecomendation();
        setRecomendations(recomendationList);
        setRecipeDetails(data[0]);
      } else {
        const data = await requestDrinkWithId(id);
        const recomendationList = await requestFoodsRecomendation();
        setRecomendations(recomendationList);
        setRecipeDetails(data[0]);
      }
    };
    requestData();
  }, []);

  return (
    <div>
      { recipeType === 'foods'
        ? <MealsDetails />
        : <DrinkDetails /> }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default RecipeDetails;
