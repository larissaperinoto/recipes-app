import React, { useState } from 'react';
import { Header, DoneRecipesCard } from '../components/index';

export default function FavoriteRecipes() {
  const [filter, setFilter] = useState([]);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  console.log(filter, favoriteRecipes);

  const handleFilters = ({ target: { name } }) => {
    if (name === 'all') setFilter(favoriteRecipes);
    if (name === 'food') {
      setFilter(favoriteRecipes.filter((done) => done.type === 'food'));
    }
    if (name === 'drinks') {
      setFilter(favoriteRecipes.filter((done) => done.type === 'drink'));
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <div id="button-group">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ handleFilters }
        >
          All
        </button>

        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ handleFilters }
        >
          Food
        </button>

        <button
          type="button"
          name="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilters }
        >
          Drinks
        </button>
      </div>

      <div id="cards">
        { filter.length > 0
          ? <DoneRecipesCard doneRecipes={ filter } />
          : <DoneRecipesCard doneRecipes={ favoriteRecipes } />}
      </div>
    </>
  );
}
