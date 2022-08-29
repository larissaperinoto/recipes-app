import React, { useState } from 'react';
import { Header, DoneRecipesCard } from '../components/index';

function DoneRecipes() {
  const [filter, setFilter] = useState([]);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleFilters = ({ target: { name } }) => {
    if (name === 'all') setFilter(doneRecipes);
    if (name === 'food') setFilter(doneRecipes.filter((done) => done.type === 'food'));
    if (name === 'drinks') {
      setFilter(doneRecipes.filter((done) => done.type === 'drink'));
    }
  };

  return (
    <>
      <Header title="Done Recipes" />
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
          : <DoneRecipesCard doneRecipes={ doneRecipes } />}
      </div>
    </>
  );
}

export default DoneRecipes;
