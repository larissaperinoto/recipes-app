import React from 'react';
import PropTypes from 'prop-types';

function MealList({ data }) {
  const QTDS_LIST = 12;
  return (
    <ul>
      {data && data.slice(0, QTDS_LIST).map((recipe, index) => (
        <li key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            width="60px"
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
