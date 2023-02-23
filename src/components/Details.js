import { Container, List, ListItem, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Context from '../context/Context';
import '../styles/Details.css';

export default function Details() {
  const { recipeDetails: { details, ingredients } } = useContext(Context);

  return (
    <Container className="details_container">
      <img
        src={ details.strDrinkThumb || details.strMealThumb }
        alt={ details.strDrink || details.strMeal }
      />
      <Typography variant="h3">{ details.strDrink || details.strMeal }</Typography>
      <Typography>{ details.strAlcoholic || details.strCategory }</Typography>
      <List>
        { ingredients.map((ingredient, index) => (
          <ListItem key={ index }>{ ingredient }</ListItem>
        ))}
      </List>
      <Typography sx={ { textAlign: 'justify' } }>{ details.strInstructions }</Typography>
      { details.strYoutube
        && <iframe
          width="100%"
          className="details_recipe_video"
          src={ details.strYoutube }
          title="Embedded youtube"
        />}
    </Container>
  );
}
