import React, { useContext } from 'react';
import { Header, FilterButtons } from '../components/index';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Context from '../context/Context';

function DoneRecipes() {
  const { filterDoneRecipes } = useContext(Context);
  return (
    <>
      <Header title="Done Recipes" />
      <FilterButtons page="doneRecipes" />
      <div id="cards">
        { filterDoneRecipes
          && <DoneRecipesCard doneRecipes={ filterDoneRecipes } /> }
      </div>
    </>
  );
}

export default DoneRecipes;
