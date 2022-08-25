import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Slider from './Slider';

function DrinksDetails() {
  const {
    recipeDetails: { details, ingredients, recomendations },
  } = useContext(Context);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
      />
      <h2 data-testid="recipe-title">{ details.strDrink }</h2>
      <p data-testid="recipe-category">{ details.strAlcoholic }</p>
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
      { recomendations && <Slider /> }
      {/* { recomendations && recomendations.map((recomendation, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <h3 data-testid={ `${index}-recomendation-title` }>{}</h3>
          <img
            src={ recomendation.strMealThumb }
            alt=""
          />
        </div>
      ))} */}
    </div>
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DrinksDetails;
