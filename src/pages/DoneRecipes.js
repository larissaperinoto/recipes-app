import React from 'react';
import { Header, DoneRecipesCard } from '../components/index';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes" />
      <div id="button-group">
        <a href="/">
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
        </a>

        <a href="/">
          <button
            type="button"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
        </a>

        <a href="/">
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </a>
      </div>
      <div id="cards">
        <DoneRecipesCard />
      </div>
    </>
  );
}

export default DoneRecipes;
