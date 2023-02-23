import React, { useContext } from 'react';
import { string, number } from 'prop-types';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox } from '@mui/material';

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
    <List>
      { ingredients && ingredients.map((ingredient, index) => (
        <ListItemButton key={ index }>
          <ListItemIcon>
            <Checkbox
              edge="start"
              value={ index }
              onChange={ () => (type === 'food'
                ? saveRecipeProgress('meals', index)
                : saveRecipeProgress('cocktails', index)) }
              checked={ isChecked(index) }
            />
          </ListItemIcon>
          <ListItemText
            primary={ ingredient }
            className={ isChecked(index) ? 'riscado' : '' }
          />
        </ListItemButton>
      ))}
    </List>
  );
}

InProgressCard.propTypes = {
  type: string,
  id: number,
}.isRequired;
