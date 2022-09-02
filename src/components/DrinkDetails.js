import React, { useContext } from 'react';
import Context from '../context/Context';

function DrinksDetails() {
  const {
    recipeDetails: { details, ingredients },
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
    </div>
  );
}

export default DrinksDetails;
