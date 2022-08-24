import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function MealList({ data }) {
  const history = useHistory();

  function gotDetal(idMeal) {
    history.push(`/foods/${idMeal}`);
  }

  const QTDS_LIST = 12;
  return (
    <form>
      {data && data.slice(0, QTDS_LIST).map((recipe, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => gotDetal(recipe.idMeal) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            width="60px"
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
        </button>
      ))}
    </form>
  );
}

MealList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MealList;
