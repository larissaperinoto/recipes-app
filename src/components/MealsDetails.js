import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function MealsDetails() {
  const {
    recipeDetails,
    recipeIngredients,
  } = useContext(Context);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt={ recipeDetails.strMeal }
      />
      <h2 data-testid="recipe-title">{ recipeDetails.strMeal }</h2>
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
      <iframe
        width="853"
        height="480"
        src={ recipeDetails.strYoutube }
        frameBorder="0"
        title="Embedded youtube"
      />
    </div>
  );
}

MealsDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MealsDetails;
