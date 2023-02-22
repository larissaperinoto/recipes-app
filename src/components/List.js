import React from 'react';
import { arrayOf, string, object } from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function List({ data, type }) {
  const history = useHistory();

  const gotDetal = (id) => {
    if (type === 'food') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <form>
      {data && data.map((recipe, index) => (
        <button
          type="reset"
          key={ index }
          onClick={ () => gotDetal(recipe.idMeal || recipe.idDrink) }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            width="60px"
          />
          <h2>{recipe.strMeal || recipe.strDrink}</h2>
        </button>
      ))}
    </form>
  );
}

List.propTypes = {
  data: arrayOf(object),
  type: string,
}.isRequired;
