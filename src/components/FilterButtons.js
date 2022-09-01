import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function FilterButtons({ page }) {
  const { handleFilters } = useContext(Context);

  return (
    <div id="button-group">
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ (event) => handleFilters(event, page) }
      >
        All
      </button>

      <button
        type="button"
        name="food"
        data-testid="filter-by-food-btn"
        onClick={ (event) => handleFilters(event, page) }
      >
        Food
      </button>

      <button
        type="button"
        name="drinks"
        data-testid="filter-by-drink-btn"
        onClick={ (event) => handleFilters(event, page) }
      >
        Drinks
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  page: PropTypes.string,
}.isRequired;
