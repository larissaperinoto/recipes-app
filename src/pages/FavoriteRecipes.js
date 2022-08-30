import React, { useContext, useEffect } from 'react';
import { Header, FavoriteRecipesCard } from '../components/index';
import Context from '../context/Context';

export default function FavoriteRecipes() {
  const { handleFilters, filter, setFilter } = useContext(Context);

  useEffect(() => {
    setFilter(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);

  return (
    <>
      <Header title="Favorite Recipes" />
      <div id="button-group">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleFilters(event, 'favoriteRecipes') }
        >
          All
        </button>

        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ (event) => handleFilters(event, 'favoriteRecipes') }
        >
          Food
        </button>

        <button
          type="button"
          name="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleFilters(event, 'favoriteRecipes') }
        >
          Drinks
        </button>
      </div>

      <div id="cards">
        { filter.length > 0 && <FavoriteRecipesCard favoriteRecipes={ filter } /> }
      </div>
    </>
  );
}
