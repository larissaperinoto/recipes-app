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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  // Done Recipes
  const [doneRecipes, setDoneRecipes] = useState([]);
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

  const value = {
    setSearch,
    search,
    error,
    searchData,
    setError,
    setSearchData,
    handleSearchChange,
    email,
    setEmail,
    password,
    setPassword,
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
    doneRecipes,
    handleSendDone,
    filterFavoriteRecipes,
    setFilterFavoriteRecipes,
    filterDoneRecipes,
    setFilterDoneRecipes,
    handleFilters,
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
