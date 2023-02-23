import React from 'react';
import { arrayOf, string, object } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card, Container, Typography, CardMedia, CardContent } from '@mui/material';

export default function FoodsAndDrinksList({ data, type }) {
  const history = useHistory();

  const gotDetal = (id) => {
    if (type === 'food') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <Container>
      {data && data.map((recipe, index) => (
        <Card
          variant="outlined"
          key={ index }
          sx={ { m: 2, textAlign: 'center', cursor: 'pointer' } }
        >
          <CardMedia
            component="img"
            image={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            width="100px"
            height="194"
            onClick={ () => gotDetal(recipe.idMeal || recipe.idDrink) }

          />
          <CardContent>
            <Typography
              variant="h5"
              sx={ { paddingTop: 1 } }
            >
              {recipe.strMeal || recipe.strDrink}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

FoodsAndDrinksList.propTypes = {
  data: arrayOf(object),
  type: string,
}.isRequired;
