import React from 'react';
import PropTypes from 'prop-types';

function MealList({ data }) {
  return (
    <ul>
      { data.map((recipe, index) => (
        <li key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
        </li>
      ))}
    </ul>
  );
}

MealList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MealList;
