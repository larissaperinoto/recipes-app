import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
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
    const data = type === 'food'
      ? await requestMealWithId(id) : await requestDrinkWithId(id);
    const recomendationList = type === 'food'
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
  const [favoriteRecipes,
    setFavoriteRecipes,
  ] = useState(JSON.parse((localStorage.getItem('favoriteRecipes'))) || []);

  const [isCopy, setIsCopy] = useState(false);

  const handleFavoriteRecipes = (type, id) => {
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
    } else {
      const { details } = recipeDetails;
      setFavoriteRecipes([
        ...favoriteRecipes,
        { id,
          type,
          nationality: type === 'food' ? details.strArea : '',
          category: details.strCategory,
          alcoholicOrNot: type === 'food' ? '' : details.strAlcoholic,
          name: details.strMeal || details.strDrink,
          image: details.strMealThumb || details.strDrinkThumb,
        },
      ]);
    }
  };

  function copyLink(type, id, testIdShare) {
    if (testIdShare === 'share-btn') {
      clipboardCopy(window.location.href.replace(/\/in-progress/i, ''));
      setIsCopy(!isCopy);
    } else {
      clipboardCopy(window.location.href.replace('/done-recipes', `/${type}s/${id}`));
      setIsCopy(true);
    }
  }

  // Done Recipes
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState([]);

  const handleFilters = ({ target: { name } }, param) => {
    const data = JSON.parse(localStorage.getItem(param)) || [];
    if (name === 'all') setFilter(data);
    if (name === 'food') {
      setFilter(data.filter((done) => done.type === 'food'));
    }
    if (name === 'drinks') {
      setFilter(data.filter((done) => done.type === 'drink'));
    }
  };

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
    favoriteRecipes,
    setFavoriteRecipes,
    handleFavoriteRecipes,
    doneRecipes,
    setDoneRecipes,
    filter,
    setFilter,
    handleFilters,
    copyLink,
    isCopy,
    setIsCopy,
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
