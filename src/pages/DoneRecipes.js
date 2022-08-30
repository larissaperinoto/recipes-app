import React, { useContext, useEffect } from 'react';
import { Header, DoneRecipesCard } from '../components/index';
import Context from '../context/Context';

function DoneRecipes() {
  const { handleFilters, filter, setFilter } = useContext(Context);

  useEffect(() => {
    setFilter(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  }, []);

  return (
    <>
      <Header title="Done Recipes" />
      <div id="button-group">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleFilters(event, 'doneRecipes') }
        >
          All
        </button>

        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ (event) => handleFilters(event, 'doneRecipes') }
        >
          Food
        </button>

        <button
          type="button"
          name="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleFilters(event, 'doneRecipes') }
        >
          Drinks
        </button>
      </div>
      <div id="cards">
        { filter.length > 0 && <DoneRecipesCard doneRecipes={ filter } /> }
      </div>
    </>
  );
}

export default DoneRecipes;
