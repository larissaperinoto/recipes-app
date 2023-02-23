import React, { useContext } from 'react';
import { Header, FilterButtons, DoneAndFavoriteList } from '../components/index';
import Context from '../context/Context';

export default function DoneRecipes() {
  const { filterDoneRecipes } = useContext(Context);
  return (
    <>
      <Header title="Done Recipes" />
      <FilterButtons page="doneRecipes" />
      <div>
        { filterDoneRecipes
          && <DoneAndFavoriteList data={ filterDoneRecipes } page="done-recipes" /> }
      </div>
    </>
  );
}
