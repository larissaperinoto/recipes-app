import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import DrinkList from './DrinkList';
import MealList from './MealList';
import HeaderContext from '../context/HeaderContext';
import {
  requestMealsAPINULL,
  requestDrinksAPINULL,
} from '../services/requestMealsAndDrinksAPI';

function Recipes({ data }) {
  const { dataFoods,
    setdataFoods,
    dataDrinks,
    setdataDrinks,
    setRecipeType,
  } = useContext(Context);
  const { searchData } = useContext(HeaderContext);
  const history = useHistory();
  const { pathname } = history.location;

  const QTDS_LIST = 12;
  const getRequestAPINULL = async () => {
    const getMeals12 = await requestMealsAPINULL();
    const getDrins12 = await requestDrinksAPINULL();
    if (searchData.length > 1) {
      data.slice(0, QTDS_LIST);
    } else {
      setdataFoods(getMeals12.slice(0, QTDS_LIST));
      setdataDrinks(getDrins12.slice(0, QTDS_LIST));
    }
  };
  useEffect(() => {
    getRequestAPINULL();
    return () => {
      setdataFoods();
      setdataDrinks();
    };
  }, []);

  if (pathname === '/drinks') {
    setRecipeType('drink');
    return (
      searchData.length >= 1
        ? <DrinkList data={ searchData } />
        : <DrinkList data={ dataDrinks } />
    );
  }

  if (pathname === '/foods') {
    setRecipeType('drink');
    return (
      searchData.length >= 1
        ? <MealList data={ searchData } />
        : <MealList data={ dataFoods } />
    );
  }
}

Recipes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Recipes;
