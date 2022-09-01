import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './styles/image.css';

export default function FavoriteRecipesCard({ favoriteRecipes }) {
  const [copy, setCopy] = useState(false);

  function copyLink(id, type) {
    clipboardCopy(window.location.href.replace('/favorite-recipes', `/${type}s/${id}`));
    setCopy(true);
  }

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

        <button
          type="button"
          onClick={ () => copyLink(recipe.id, recipe.type) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="shareIcon"
          />
        </button>

        { copy && <p>Link copied!</p> }

        <button
          type="button"
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="shareIcon"
          />
        </button>

      </div>
    ))
  );
}
