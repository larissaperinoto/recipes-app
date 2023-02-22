import { Button, Container } from '@mui/material';
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
    <Container
      maxWidth="lg"
      sx={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }
    >
      <Button
        type="button"
        size="large"
        color="secondary"
        onClick={ clearCategory }
      >
        All
      </Button>
      {categorys && categorys.map((category, index) => (
        <Button
          key={ index }
          type="button"
          size="large"
          color="secondary"
          onClick={ () => requestByCategoryFilter(category.strCategory) }
        >
          {category.strCategory}
        </Button>
      ))}
    </Container>
  );
}
