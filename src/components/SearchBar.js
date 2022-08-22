import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { handleSearchChange, handleSearch } = useContext(MyContext);
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
        Seleção
      </button>
    </form>
  );
}

export default SearchBar;
