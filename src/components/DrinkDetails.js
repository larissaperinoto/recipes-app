import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function DrinksDetails() {
  const {
    recipeDetails: { details, ingredients },
  } = useContext(Context);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
      />
      <h2 data-testid="recipe-title">{ details.strDrink }</h2>
      <p data-testid="recipe-category">{ details.strCategory }</p>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ details.strInstructions }</p>
      <div data-testid="index-recomendation-card" />
    </div>
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DrinksDetails;
