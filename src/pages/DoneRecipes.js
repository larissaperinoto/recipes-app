import React, { useContext, useEffect } from 'react';
import { Header, FilterButtons } from '../components/index';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Context from '../context/Context';

function DoneRecipes() {
  const { filterDoneRecipes, setFilterDoneRecipes } = useContext(Context);

  useEffect(() => {
    setFilterDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  }, []);

  return (
    <>
      <Header title="Done Recipes" />
      <FilterButtons page="doneRecipes" />
      <div id="cards">
        { filterDoneRecipes.length > 0
          && <DoneRecipesCard doneRecipes={ filterDoneRecipes } /> }
      </div>
    </>
  );
}

export default DoneRecipes;
