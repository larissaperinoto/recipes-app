import React from 'react';
import PropTypes from 'prop-types';

function StartRecipeButton({ handleStartRecipe }) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // Arrumar quando a chave inProgressRecipes estiver correto.
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
      onClick={ handleStartRecipe }
    >
      { inProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }
    </button>
  );
}

StartRecipeButton.propTypes = {
  handleStartRecipe: PropTypes.func,
}.isRequired;

export default StartRecipeButton;
