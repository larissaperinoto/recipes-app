import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function DrinksDetails() {
  const {
    recipeDetails,
    recipeIngredients,
  } = useContext(Context);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strDrink }
      />
      <h2 data-testid="recipe-title">{ recipeDetails.strDrink }</h2>
      <p data-testid="recipe-category">{ recipeDetails.strCategory }</p>
      <ul>
        { recipeIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
    </div>
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DrinksDetails;
