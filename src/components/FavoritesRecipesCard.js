import React from 'react';
import { Link } from 'react-router-dom';

import { FavoriteAndShareButtons } from './index';
import './styles/image.css';

export default function FavoriteRecipesCard({ favoriteRecipes }) {
  return (
    favoriteRecipes && favoriteRecipes.map((recipe, index) => (
      <div id="card" key={ index }>

        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.name }
            className="img"
          />
        </Link>

        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.type === 'food'
            ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }
        </h4>

        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h3>
        </Link>

        <FavoriteAndShareButtons
          type={ recipe.type }
          id={ recipe.id }
          testIdShare={ `${index}-horizontal-share-btn` }
          testIdFavorite={ `${index}-horizontal-favorite-btn` }
          replace="favorite-recipes"
        />

      </div>
    ))
  );
}
