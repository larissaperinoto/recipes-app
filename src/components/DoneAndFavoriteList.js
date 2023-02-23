import React from 'react';
import { array, string } from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import '../styles/DoneAndFavoriteList.css';

import FavoriteAndShareButtons from './FavoriteAndShareButtons';

export default function DoneAndFavoriteList({ data, page }) {
  const history = useHistory();

  return (
    <Container>
      { data && data.map((recipe, index) => (
        <Card
          key={ index }
          className="done_favorite_card"
          onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          sx={ { textAlign: 'center', m: 2 } }
        >
          <CardMedia
            component="img"
            height="194"
            image={ recipe.image }
            alt={ recipe.name }
          />
          <CardContent>
            <h4>
              { recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </h4>
            <Typography variant="h4">{ recipe.name }</Typography>

            { page === 'done-recipes' && <p>{ recipe.doneDate }</p> }
          </CardContent>

          <FavoriteAndShareButtons
            type={ recipe.type }
            id={ recipe.id }
            testIdShare={ `${index}-horizontal-share-btn` }
            testIdFavorite={ `${index}-horizontal-favorite-btn` }
            replace={ page }
          />
          <Stack direction="row" spacing={ 2 }>
            { recipe.tags && recipe.tags.map((item, i) => (
              <Typography key={ i } sx={ { padding: 1 } }>{ item }</Typography>
            ))}
          </Stack>
        </Card>
      ))}
    </Container>
  );
}

DoneAndFavoriteList.propTypes = {
  data: array,
  page: string,
}.isRequired;
