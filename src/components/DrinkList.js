import React from 'react';
import PropTypes from 'prop-types';

function DrinkList({ data }) {
  return (
    <ul>
      { data.map((recipe, index) => (
        <li key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
        </li>
      ))}
    </ul>
  );
}

DrinkList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default DrinkList;
