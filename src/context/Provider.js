import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';

function Provider({ children }) {
  // Header
  const [search, setSearch] = useState({
    value: '',
    filter: '',
  });

  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState('');

  const handleSearchChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  // Login
  const [userEmail, setUserEmail] = useState({ user: { email: '', isValid: false } });
  const [userSenha, setUserSenha] = useState({ senha: { isValid: false } });

  // Recipe
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);

  // Recipe Details
  const [recipeDetails, setRecipeDetails] = useState({
    details: [],
    ingredients: [],
    recomendations: [],
  });
  console.log(recipeDetails);

  const getIngredients = (data) => {
    const max = 30;
    const ingredients = [];
    for (let index = 1; index <= max; index += 1) {
      if (data[`strIngredient${index}`]) {
        const string = `${data[`strMeasure${index}`]} ${data[`strIngredient${index}`]}`;
        ingredients.push(string);
      }
    }
    return ingredients;
  };

  const requestData = async (type, id) => {
    const data = type === 'foods'
      ? await requestMealWithId(id) : await requestDrinkWithId(id);
    const recomendationList = type === 'foods'
      ? await requestDrinksRecomendation() : await requestFoodsRecomendation();
    const ingredientsList = getIngredients(data[0]);
    setRecipeDetails({
      details: data[0],
      ingredients: ingredientsList,
      recomendations: recomendationList,
    });
  };

  // Recipe in Progress
  const [inProgressRecipes, setInProgressRecipes] = useState({ id: '', arr: [] });

  // Favorite Button
  const [isFavorite, setIsFavorite] = useState({ id: [], isFavorite: false });
  const [isCopy, setisCopy] = useState(false);
  const [isFavoriteId, setIsFavoriteId] = useState(false);

  const value = {
    setSearch,
    search,
    error,
    searchData,
    setError,
    setSearchData,
    handleSearchChange,
    userEmail,
    setUserEmail,
    userSenha,
    setUserSenha,
    recipeDetails,
    setRecipeDetails,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
    toggleFilter,
    setToggleFilter,
    requestData,
    inProgressRecipes,
    setInProgressRecipes,
    isFavorite,
    setIsFavorite,
    isCopy,
    setisCopy,
    isFavoriteId,
    setIsFavoriteId,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
