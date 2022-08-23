import React from 'react';
import PropTypes from 'prop-types';

function DrinkList({ data }) {
  const QTDS_LIST = 12;
  return (
    <ul>
      { data && data.slice(0, QTDS_LIST).map((recipe, index) => (
        <li key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            width="60px"
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
