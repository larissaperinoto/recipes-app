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
  console.log(endpoint);

  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};
