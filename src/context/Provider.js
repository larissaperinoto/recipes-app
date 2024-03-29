import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

import {
  requestMealWithId,
  requestDrinkWithId,
  requestDrinksRecomendation,
  requestFoodsRecomendation } from '../services/requestMealsAndDrinksAPI';

function Provider({ children }) {
  // Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Header
  const [search, setSearch] = useState({
    value: '',
    filter: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearchChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  // Recipe
  const [initialData, setInitialData] = useState([]);
  const [byCategoryData, setByCategoryData] = useState([]);
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

  // Recipe in Progress
  const [inProgressRecipes,
    setInProgressRecipes,
  ] = useState(JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: {},
    meals: {},
  });

  // Favorite Recipes
  const [favoriteRecipes,
    setFavoriteRecipes,
  ] = useState(JSON.parse((localStorage.getItem('favoriteRecipes'))) || []);

  // Done Recipes
  const [doneRecipes, setDoneRecipes] = useState([]);

  const dateGenerator = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSendDone = (type, id) => {
    const { details } = recipeDetails;
    setDoneRecipes([
      ...doneRecipes,
      {
        id,
        type: type.split('s')[0],
        nationality: type === 'food' ? details.strArea : '',
        category: type === 'food' ? details.strCategory : '',
        alcoholicOrNot: type === 'food' ? '' : details.strAlcoholic,
        name: details.strMeal || details.strDrink,
        image: details.strMealThumb || details.strDrinkThumb,
        doneDate: dateGenerator(),
        tags: details.strTags
          ? details.strTags.split(',') : '',
      },
    ]);
  };

  const handleFavoriteRecipes = (paramType, paramId) => {
    if (favoriteRecipes.some((recipe) => recipe.id === paramId)) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== paramId));
    } else {
      const { details } = recipeDetails;
      setFavoriteRecipes([
        ...favoriteRecipes,
        { id,
          type,
          nationality: paramType === 'food' ? details.strArea : '',
          category: details.strCategory,
          alcoholicOrNot: paramType === 'food' ? '' : details.strAlcoholic,
          name: details.strMeal || details.strDrink,
          image: details.strMealThumb || details.strDrinkThumb,
        },
      ]);
    }
  };

  // Favorite and Share Buttons
  const [isCopy, setIsCopy] = useState(false);

  // Filter Buttons
  const [filterDoneRecipes,
    setFilterDoneRecipes,
  ] = useState(JSON.parse(localStorage.getItem('doneRecipes')));
  const [filterFavoriteRecipes,
    setFilterFavoriteRecipes,
  ] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));

  const whereSetFilter = (page, data) => {
    if (page === 'favoriteRecipes') {
      setFilterFavoriteRecipes(data);
    } else {
      setFilterDoneRecipes(data);
    }
  };

  const handleFilters = ({ target: { name } }, param) => {
    const data = JSON.parse(localStorage.getItem(param)) || [];
    if (name === 'all') {
      whereSetFilter(param, data);
    }
    if (name === 'food') {
      whereSetFilter(param, data.filter((done) => done.type === 'food'));
    }
    if (name === 'drinks') {
      whereSetFilter(param, data.filter((done) => done.type === 'drink'));
    }
  };

  const generateTypeAndId = (pathname) => {
    const type = pathname.split('/')[1].split('s')[0];
    const id = pathname.split('/')[2];

    return { type, id };
  };

  const saveRecipeId = (key, id) => {
    const indexSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (indexSaved && indexSaved[key][id]) {
      setInProgressRecipes({
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [...indexSaved[key][id]],
        },
      });
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [id]: [],
        },
      });
    }
  };

  const finishRecipe = (key, id) => !(inProgressRecipes[key][id]
    && recipeDetails.ingredients.length === inProgressRecipes[key][id].length);

  const requestData = async (recipeType, recipeId) => {
    const data = recipeType === 'food'
      ? await requestMealWithId(recipeId) : await requestDrinkWithId(recipeId);
    const recomendationList = recipeType === 'food'
      ? await requestDrinksRecomendation() : await requestFoodsRecomendation();
    const ingredientsList = getIngredients(data[0]);
    setRecipeDetails({
      details: data[0],
      ingredients: ingredientsList,
      recomendations: recomendationList,
    });
  };

  const value = {
    email,
    password,
    setEmail,
    setPassword,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    error,
    setError,
    handleSearchChange,
    initialData,
    setInitialData,
    toggleFilter,
    setToggleFilter,
    favoriteRecipes,
    setFavoriteRecipes,
    isCopy,
    setIsCopy,
    recipeDetails,
    setFilterFavoriteRecipes,
    filterDoneRecipes,
    filterFavoriteRecipes,
    doneRecipes,
    setDoneRecipes,
    handleFilters,
    handleSendDone,
    inProgressRecipes,
    setInProgressRecipes,
    byCategoryData,
    setByCategoryData,
    generateTypeAndId,
    getIngredients,
    setRecipeDetails,
    handleFavoriteRecipes,
    saveRecipeId,
    finishRecipe,
    requestData,
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
