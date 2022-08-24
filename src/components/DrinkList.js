import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function DrinkList({ data }) {
  const history = useHistory();

  function gotDetal(idDrink) {
    history.push(`/drinks/${idDrink}`);
  }

  const QTDS_LIST = 12;
  return (
    <form>
      {data && data.slice(0, QTDS_LIST).map((recipe, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => gotDetal(recipe.idDrink) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            width="60px"
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
        </button>
      ))}
    </form>
  );
}

DrinkList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default DrinkList;
