import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Context from '../context/Context';
import {
  requestCategoryFood,
  requestCategoryDrinks,
  requestMealByCategory,
  requestDrinkByCategory,
} from '../services/requestMealsAndDrinksAPI';

export default function Category() {
  const [categorys, setCategorys] = useState([]);

  const { setSearchResults, setToggleFilter, generateTypeAndId } = useContext(Context);

  const { location: { pathname } } = useHistory();
  const { type } = generateTypeAndId(pathname);

  const requestByCategoryFilter = async (category) => {
    const filterByCategory = type === 'food'
      ? await requestMealByCategory(category) : await requestDrinkByCategory(category);
    setSearchResults(filterByCategory);
  };

  const clearCategory = async () => {
    setToggleFilter(false);
  };

  useEffect(() => {
    const getCategoryList = async () => {
      const categoryList = type === 'food'
        ? await requestCategoryFood() : await requestCategoryDrinks();
      setCategorys(categoryList);
    };
    getCategoryList();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={ clearCategory }
      >
        All
      </button>
      {categorys && categorys.map((category, index) => (
        <button
          key={ index }
          type="button"
          onClick={ () => requestByCategoryFilter(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}
