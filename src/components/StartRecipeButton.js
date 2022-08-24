import React from 'react';
import PropTypes from 'prop-types';

function StartRecipeButton({ handleStartRecipe }) {
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
      onClick={ handleStartRecipe }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  handleStartRecipe: PropTypes.func,
}.isRequired;

export default StartRecipeButton;
