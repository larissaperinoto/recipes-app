import React, { useContext } from 'react';

import { Header, FilterButtons, DoneAndFavoriteList } from '../components/index';
import Context from '../context/Context';

export default function FavoriteRecipes() {
  const { filterFavoriteRecipes } = useContext(Context);

  return (
    <>
      <Header title="Favorite Recipes" />
      <FilterButtons page="favoriteRecipes" />
      <div id="cards">
        { filterFavoriteRecipes
          && <DoneAndFavoriteList
            data={ filterFavoriteRecipes }
            page="favorite-recipes"
          /> }
      </div>
    </>
  );
}
