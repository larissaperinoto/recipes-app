import React, { useContext, useEffect } from 'react';
import { Header, FilterButtons } from '../components/index';
import FavoriteRecipesCard from '../components/FavoritesRecipesCard';
import Context from '../context/Context';

export default function FavoriteRecipes() {
  const { setFilterFavoriteRecipes, filterFavoriteRecipes } = useContext(Context);

  useEffect(() => {
    setFilterFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);

  return (
    <>
      <Header title="Favorite Recipes" />
      <FilterButtons page="favoriteRecipes" />
      <div id="cards">
        { filterFavoriteRecipes.length > 0
          && <FavoriteRecipesCard favoriteRecipes={ filterFavoriteRecipes } /> }
      </div>
    </>
  );
}
