import React, { useContext } from 'react';
import { Header, FilterButtons } from '../components/index';
import FavoriteRecipesCard from '../components/FavoritesRecipesCard';
import Context from '../context/Context';

export default function FavoriteRecipes() {
  const { filterFavoriteRecipes } = useContext(Context);

  return (
    <>
      <Header title="Favorite Recipes" />
      <FilterButtons page="favoriteRecipes" />
      <div id="cards">
        { filterFavoriteRecipes
          && <FavoriteRecipesCard favoriteRecipes={ filterFavoriteRecipes } /> }
      </div>
    </>
  );
}
