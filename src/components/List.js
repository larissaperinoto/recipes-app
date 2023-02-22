import React from 'react';
import { arrayOf, string, object } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card, Grid, Typography } from '@mui/material';

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
    <Grid container justifyContent="center" marginBottom="100px">
      {data && data.map((recipe, index) => (
        <Card
          variant="outlined"
          key={ index }
          sx={ { padding: 3, m: 2, textAlign: 'center', cursor: 'pointer' } }
          onClick={ () => gotDetal(recipe.idMeal || recipe.idDrink) }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            width="100px"
          />
          <Typography
            variant="h5"
            sx={ { paddingTop: 1 } }
          >
            {recipe.strMeal || recipe.strDrink}
          </Typography>
        </Card>
      ))}
    </Grid>
  );
}

List.propTypes = {
  data: arrayOf(object),
  type: string,
}.isRequired;
