import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Slider from './Slider';

function MealsDetails() {
  const {
    recipeDetails: { details, ingredients, recomendations },
  } = useContext(Context);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt={ details.strMeal }
      />
      <h2 data-testid="recipe-title">{ details.strMeal }</h2>
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
      <iframe
        width="853"
        height="480"
        src={ details.strYoutube }
        frameBorder="0"
        title="Embedded youtube"
        data-testid="video"
      />
      <div>
        { recomendations && <Slider /> }
      </div>
    </div>
  );
}

MealsDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MealsDetails;
