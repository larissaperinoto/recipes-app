import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import {
  requestMealsAPI,
  requestDrinksAPI } from '../../services/requestMealsAndDrinksAPI';

function SearchBar() {
  const { setSearchData, search, setError, handleSearchChange } = useContext(Context);
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];

  const handleSearch = async () => {
    const { filter, value } = search;
    if (filter === 'First letter' && value.length !== 1) {
      setError('Your search must have only 1 (one) character');
    }
    const data = path === 'foods'
      ? await requestMealsAPI(filter, value) : await requestDrinksAPI(filter, value);

    if (data) {
      setSearchData(data);
    } else {
      setError('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <form>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="filter"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          onChange={ handleSearchChange }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="filter"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="Name"
          onChange={ handleSearchChange }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          name="filter"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="First letter"
          onChange={ handleSearchChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
