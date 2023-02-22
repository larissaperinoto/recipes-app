import React from 'react';
import { string, number } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

export default function StartRecipeButton({ objectKey, id }) {
  const history = useHistory();

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const handleStartRecipe = () => {
    if (objectKey === 'meals') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <Button
      type="button"
      variant="outlined"
      color="secondary"
      sx={ { ml: 2 } }
      onClick={ () => handleStartRecipe() }
    >
      { inProgressRecipes && inProgressRecipes[objectKey][id]
        ? 'Continue Recipe' : 'Start Recipe' }
    </Button>
  );
}

StartRecipeButton.propTypes = {
  objectKey: string,
  id: number,
}.isRequired;
