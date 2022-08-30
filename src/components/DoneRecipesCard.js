import React from 'react';
import FavoriteAndShareButtons from './FavoriteAndShareButtons';

export default function DoneRecipesCard({ doneRecipes }) {
  // const history = useHistory();

  /* const handleClick = (id, type) => {
    history.push(`/${type}s/${id}`);
  }; */

  return (
    doneRecipes && doneRecipes.map((recipe, index) => (
      <div id="card" key={ index }>
        <img
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
          alt={ recipe.name }
          // onClick={ () => handleClick(recipe.id, recipe.type) }
        />
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.type === 'food'
            ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }
        </h4>
        <h3 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h3>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { recipe.doneDate }
        </p>
        <FavoriteAndShareButtons
          type={ recipe.type }
          id={ recipe.id }
          testIdShare={ `${index}-horizontal-share-btn` }
          testIdFavorite={ `${index}-horizontal-favorite-btn` }
        />
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
