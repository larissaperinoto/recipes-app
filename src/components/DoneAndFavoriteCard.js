import React from 'react';
import { object, string } from 'prop-types';

import FavoriteAndShareButtons from './FavoriteAndShareButtons';

export default function DoneAndFavoriteCard({ data, page }) {
  return (
    data && data.map((recipe, index) => (
      <div key={ index }>

        <a href={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            width="100%"
          />
        </a>

        <h4>
          { recipe.type === 'food'
            ? `${recipe.nationality} - ${recipe.category}`
            : recipe.alcoholicOrNot }
        </h4>

        <a href={ `/${recipe.type}s/${recipe.id}` }>
          <h3>{ recipe.name }</h3>
        </a>

        { page === 'done-recipes' && <p>{ recipe.doneDate }</p> }

        <FavoriteAndShareButtons
          type={ recipe.type }
          id={ recipe.id }
          testIdShare={ `${index}-horizontal-share-btn` }
          testIdFavorite={ `${index}-horizontal-favorite-btn` }
          replace={ page }
        />

        { recipe.tags && recipe.tags.map((item, i) => (
          <p key={ i }>{ item }</p>
        ))}

      </div>
    ))
  );
}

DoneAndFavoriteCard.proptype = {
  data: object,
  page: string,
}.isRequired;
