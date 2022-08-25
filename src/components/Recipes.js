import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import DrinkList from './DrinkList';
import MealList from './MealList';
import {
  requestDrinksRecomendation,
  requestFoodsRecomendation,
} from '../services/requestMealsAndDrinksAPI';

function Recipes() {
  const { dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
    searchData,
  } = useContext(Context);

  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.split('/')[1];

  const getRequestAPINULL = async () => {
    if (type === 'foods') {
      const getMeals12 = await requestFoodsRecomendation('initial');
      setDataFoods(getMeals12);
    } else {
      const getDrins12 = await requestDrinksRecomendation('initial');
      setDataDrinks(getDrins12);
    }
  };
  useEffect(() => getRequestAPINULL(), []);

  if (pathname === '/drinks') {
    const condition = searchData.length === 0 && dataDrinks.length >= 1;
    return (
      <div>
        { condition && <DrinkList data={ dataDrinks } /> }
        { searchData.length > 1 && <DrinkList data={ searchData } /> }
      </div>
    );
  }

  if (pathname === '/foods') {
    const condition = searchData.length === 0 && dataFoods.length >= 1;
    return (
      <div>
        { condition && <MealList data={ dataFoods } /> }
        { searchData.length > 1 && <MealList data={ searchData } /> }
      </div>
    );
  }
}

Recipes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Recipes;
