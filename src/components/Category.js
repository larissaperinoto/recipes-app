import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import HeaderContext from '../context/HeaderContext';
import {
  requestCategoryFood,
  requestCategoryDrinks,
  requestCategorysFoods,
  requestCategorysDrinks,
} from '../services/requestMealsAndDrinksAPI';

function Category() {
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const { searchData, setSearchData } = useContext(HeaderContext);
  const { toggleFilter, setToggleFilter } = useContext(Context);

  const handleSendCategoryFoods = async (category) => {
    const getDrinsCategory = await requestCategorysFoods(category);
    setToggleFilter(!toggleFilter);
    setSearchData(getDrinsCategory || searchData);
  };

  const handleSendCategoryDrinks = async (category) => {
    const getDrinsCategory = await requestCategorysDrinks(category);
    setToggleFilter(!toggleFilter);
    setSearchData(getDrinsCategory || searchData);
  };

  const clearCategory = () => {
    setSearchData([]);
  };

  useEffect(() => {
    const QTDS_LIST = 5;
    const getRequestAPINULL = async () => {
      const getCateFoods = await requestCategoryFood();
      const getCateDrinks = await requestCategoryDrinks();
      setCategoryFoods(getCateFoods.slice(0, QTDS_LIST));
      setCategoryDrinks(getCateDrinks.slice(0, QTDS_LIST));
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
        {categoryFoods.map((categoryFood, index) => (
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
