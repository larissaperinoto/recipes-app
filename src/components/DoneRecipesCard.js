import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipesCard({ doneRecipes }) {
  const [copy, setCopy] = useState(false);

  function copyLink() {
    clipboardCopy(window.location.href);
    setCopy(true);
  }

  console.log(doneRecipes);

  return (
    // Fazer o map do localStorage aqui!
    doneRecipes && doneRecipes.map((recipe, index) => (
      <div id="card" key={ index }>
        <img
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
          alt=""
        />
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe.nationality} - ${recipe.category}` }
        </h4>
        <h3 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h3>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { recipe.doneDate }
        </p>
        <button
          type="button"
          onClick={ copyLink }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="shareIcon"
          />
        </button>
        { copy && <p>Link copied!</p> }
        { recipe.tags.length > 0 && recipe.tags.map((item, i) => (
          <p
            data-testid={ `${index}-${item}-horizontal-tag` }
            key={ i }
          >
            { item }
          </p>
        ))}
      </div>
    ))
  );
}
