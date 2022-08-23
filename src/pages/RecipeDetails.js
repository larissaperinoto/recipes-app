import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import {
  requestMealWithId,
  requestDrinkWithId } from '../services/requestMealsAndDrinksAPI';

function RecipeDetails({ history }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const { recipeType } = useContext(Context);
  console.log(recipeDetails);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  console.log(id);

  useEffect(() => {
    const requestData = async () => {
      if (recipeType === 'foods') {
        const data = await requestMealWithId(id);
        setRecipeDetails(data);
      }
      const data = await requestDrinkWithId(id);
      setRecipeDetails(data);
    };
    requestData();
  }, []);

  return (
    <h1>Hello World</h1>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default RecipeDetails;
