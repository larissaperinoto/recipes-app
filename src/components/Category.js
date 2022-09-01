import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import {
  requestCategoryFood,
  requestCategoryDrinks,
  requestCategorysFoods,
  requestCategorysDrinks,
  requestFoodsRecomendation,
  requestDrinksRecomendation,
} from '../services/requestMealsAndDrinksAPI';

function Category() {
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);

  const {
    setDataFoods,
    setDataDrinks,
    toggleFilter,
    setToggleFilter } = useContext(Context);

  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.split('/')[1];

  const handleSendCategoryFoods = async (category) => {
    const getFoodsCategory = toggleFilter
      ? await requestFoodsRecomendation('initial')
      : await requestCategorysFoods(category);
    setDataFoods(getFoodsCategory);
    setToggleFilter(!toggleFilter);
  };

  const handleSendCategoryDrinks = async (category) => {
    const getDrinsCategory = toggleFilter
      ? await requestDrinksRecomendation('initial')
      : await requestCategorysDrinks(category);
    setDataDrinks(getDrinsCategory);
    setToggleFilter(!toggleFilter);
  };

  const clearCategory = async () => {
    if (type === 'foods') {
      const getMeals12 = await requestFoodsRecomendation('initial');
      setDataFoods(getMeals12);
    } else {
      const getDrins12 = await requestDrinksRecomendation('initial');
      setDataDrinks(getDrins12);
    }
  };

  useEffect(() => {
    const QTDS_LIST = 5;
    const getRequestAPINULL = async () => {
      if (pathname === '/foods') {
        const getCateFoods = await requestCategoryFood();
        setCategoryFoods(getCateFoods.slice(0, QTDS_LIST));
      } else {
        const getCateDrinks = await requestCategoryDrinks();
        setCategoryDrinks(getCateDrinks.slice(0, QTDS_LIST));
      }
    };
    getRequestAPINULL();
    return () => {
      setCategoryFoods();
      setCategoryDrinks();
    };
  }, []);

  if (pathname === '/foods') {
    return (
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ clearCategory }
        >
          All
        </button>
        {categoryFoods && categoryFoods.map((categoryFood, index) => (
          <button
            key={ index }
            data-testid={ `${categoryFood.strCategory}-category-filter` }
            type="button"
            onClick={ () => handleSendCategoryFoods(categoryFood.strCategory) }
          >
            {categoryFood.strCategory}
          </button>
        ))}
      </div>
    );
  }
  if (pathname === '/drinks') {
    return (
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ clearCategory }
        >
          All
        </button>
        {categoryDrinks.map((categoryDrink, index) => (
          <button
            key={ index }
            data-testid={ `${categoryDrink.strCategory}-category-filter` }
            type="button"
            onClick={ () => handleSendCategoryDrinks(categoryDrink.strCategory) }
          >
            {categoryDrink.strCategory}
          </button>
        ))}
      </div>
    );
  }
}

export default Category;
