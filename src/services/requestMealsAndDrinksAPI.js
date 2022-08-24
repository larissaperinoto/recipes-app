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

export const requestMealWithId = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  console.log(endpoint);

  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const requestDrinkWithId = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const maxRecomendation = 6;

  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks.slice(0, maxRecomendation);
};

export const requestFoodsRecomendation = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const maxRecomendation = 6;

  const { foods } = await fetch(endpoint).then((response) => response.json());
  return foods.slice(0, maxRecomendation);
};

export const requestDrinksRecomendation = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};
