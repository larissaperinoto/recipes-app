import React from 'react';

function SearchBar() {
  return (
    <form>
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Iniciais
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Seleção
      </button>
    </form>
  );
}

export default SearchBar;
