import React, { useContext, useEffect } from 'react';
import { arrayOf, object } from 'prop-types';
import { useHistory } from 'react-router-dom';

import Context from '../context/Context';
import FoodsAndDrinksList from './FoodsAndDrinksList';
import {
  requestDrinksRecomendation,
  requestFoodsRecomendation,
} from '../services/requestMealsAndDrinksAPI';

export default function Recipes() {
  const {
    searchResults,
    setInitialData,
    initialData,
    generateTypeAndId } = useContext(Context);

  const { location: { pathname } } = useHistory();
  const { type } = generateTypeAndId(pathname);

  useEffect(() => {
    const requestInitial = async () => {
      const initialRecomendation = type === 'food'
        ? await requestFoodsRecomendation('initial')
        : await requestDrinksRecomendation('initial');
      setInitialData(initialRecomendation);
    };
    requestInitial();
  }, []);

  const condition = searchResults.length === 0 && initialData.length >= 1;
  return (
    <main>
      { condition && <FoodsAndDrinksList data={ initialData } type={ type } /> }
      { searchResults.length > 1
        && <FoodsAndDrinksList data={ searchResults } type={ type } /> }
    </main>
  );
}

Recipes.propTypes = {
  data: arrayOf(object),
}.isRequired;
