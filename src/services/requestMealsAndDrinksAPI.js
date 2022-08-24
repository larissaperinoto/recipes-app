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

export const requestMealsAPINULL = async () => {
  try {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const response = await fetchApi.json();
    return response.meals;
  } catch (error) {
    return error;
  }
};

export const requestDrinksAPINULL = async () => {
  try {
    const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const response = await fetchApi.json();
    return response.drinks;
  } catch (error) {
    return error;
  }
};

export const requestCategoryFood = async () => {
  try {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const response = await fetchApi.json();
    return response.meals;
  } catch (error) {
    return error;
  }
};

export const requestCategoryDrinks = async () => {
  try {
    const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const response = await fetchApi.json();
    return response.drinks;
  } catch (error) {
    return error;
  }
};

export const requestCategorysFoods = async (getCatebory) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${getCatebory}`);
    const response = await fetchApi.json();
    return response.meals;
  } catch (error) {
    return error;
  }
};

export const requestCategorysDrinks = async (getCatebory) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${getCatebory}`);
    const response = await fetchApi.json();
    return response.drinks;
  } catch (error) {
    return error;
  }
};

export const requestMealWithId = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const requestDrinkWithId = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log('id');
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};

const maxRecomendation = 7;

export const requestFoodsRecomendation = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  console.log('recomendação');

  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals.slice(1, maxRecomendation);
};

export const requestDrinksRecomendation = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks.slice(1, maxRecomendation);
};
