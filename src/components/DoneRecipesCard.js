import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipesCard({ doneRecipes }) {
  const [copy, setCopy] = useState(false);

  function copyLink(id, type) {
    clipboardCopy(window.location.href.replace('/done-recipes', `/${type}s/${id}`));
    setCopy(true);
  }

  console.log(doneRecipes);

  return (
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
          onClick={ () => copyLink(recipe.id, recipe.type) }
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
