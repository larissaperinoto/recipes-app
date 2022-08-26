import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import '../css/RecipeDetails.css';
import Context from '../context/Context';
import MealsDetails from '../components/MealsDetails';
import DrinkDetails from '../components/DrinkDetails';
import StartRecipeButton from '../components/StartRecipeButton';

function RecipeDetails({ history }) {
  const { requestData } = useContext(Context);

  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleStartRecipe = () => {
    if (type === 'foods') {
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
