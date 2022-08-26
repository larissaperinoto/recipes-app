import React from 'react';

export default function DoneRecipesCard() {
  const [copy, setCopy] = useState(false);

  function copyLink() {
    clipboardCopy(window.location.href);
    setCopy(true);
  }

  return (
    // Fazer o map do localStorage aqui!
    doneRecipes.map((recipe, index) => (
      <div id="card" key={ index }>
        <img
          src="/"
          data-testid={ `${index}-horizontal-image` }
          alt=""
        />
        <h4 data-testid={ `${index}-horizontal-top-text">categoria` }>
          categoria
        </h4>
        <h3 data-testid={ ` ${index}-horizontal-name` }>
          { recipe.name }
        </h3>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { recipe.date }
        </p>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ copyLink }
        >
          Compartilhar
        </button>
        { copy && <p>Link copied!</p> }
        <p data-testid={ `${index}-${tagName}-horizontal-tag` }>
          { recipe.tag }
        </p>
      </div>
    ))
  );
}
