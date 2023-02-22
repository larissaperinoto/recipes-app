import React, { useContext } from 'react';
import { string, number } from 'prop-types';

import Context from '../context/Context';

export default function InProgressCard({ type, id }) {
  const { recipeDetails: { ingredients },
    inProgressRecipes,
    setInProgressRecipes } = useContext(Context);

  const saveRecipeProgress = (key, index) => {
    if (inProgressRecipes[key][id].includes(index)) {
      setInProgressRecipes({
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [...inProgressRecipes[key][id].filter((i) => i !== index)],
        },
      });
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [...inProgressRecipes[key][id], index],
        },
      });
    }
  };

  const isChecked = (index) => {
    const item = inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id];
    return !!(item && item.some((i) => i === index));
  };

  return (
    <ul>
      { ingredients && ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label
            className={ isChecked(index) && 'isDone' }
            htmlFor={ `ingredients-item-${index}` }
          >
            <input
              type="checkbox"
              id={ `ingredients-item-${index}` }
              value={ index }
              onChange={ () => (type === 'food'
                ? saveRecipeProgress('meals', index)
                : saveRecipeProgress('cocktails', index)) }
              checked={ isChecked(index) }
            />
            {ingredient}
          </label>
        </li>
      ))}
    </ul>
  );
}

InProgressCard.propTypes = {
  type: string,
  id: number,
}.isRequired;
