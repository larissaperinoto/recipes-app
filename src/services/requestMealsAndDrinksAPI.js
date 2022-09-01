const urlFoodGenerator = (filter, value) => {
  if (filter === 'Ingredient') {
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  }
  if (filter === 'Name') {
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  }

  if (filter === 'First letter') {
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  }
};

const urlDrinkGenerator = (filter, value) => {
  if (filter === 'Ingredient') {
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  }
  if (filter === 'Name') {
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  }

  if (filter === 'First letter') {
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
  }
};

export const requestMealsAPI = async (filter, value) => {
  const endpoint = urlFoodGenerator(filter, value);

  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const requestDrinksAPI = async (filter, value) => {
  const endpoint = urlDrinkGenerator(filter, value);

  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};

export const requestCategoryFood = async () => {
  const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await fetchApi.json();
  return response.meals;
};

export const requestCategoryDrinks = async () => {
  const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await fetchApi.json();
  return response.drinks;
};

export const requestCategorysFoods = async (getCatebory) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${getCatebory}`);
  const response = await fetchApi.json();
  return response.meals;
};

export const requestCategorysDrinks = async (getCatebory) => {
  const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${getCatebory}`);
  const response = await fetchApi.json();
  return response.drinks;
};

export const requestMealWithId = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const requestDrinkWithId = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};

const maxInicialOptions = 13;
const maxRecomendation = 6;

export const requestFoodsRecomendation = async (param) => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const { meals } = await fetch(endpoint).then((response) => response.json());
  if (param === 'initial') {
    return meals.slice(0, maxInicialOptions);
  }
  return meals.slice(0, maxRecomendation);
};

export const requestDrinksRecomendation = async (param) => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const { drinks } = await fetch(endpoint).then((response) => response.json());
  if (param === 'initial') {
    return drinks.slice(0, maxInicialOptions);
  }
  return drinks.slice(0, maxRecomendation);
};
