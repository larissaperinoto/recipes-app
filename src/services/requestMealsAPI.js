const urlGenerator = (filter, value) => {
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

const requestMealsAPI = async (filter, value) => {
  const endpoint = urlGenerator(filter, value);

  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export default requestMealsAPI;
