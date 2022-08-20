import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';

function SearchHeader({ handleClickSearch }) {
  return (
    <button
      type="button"
      onClick={ handleClickSearch }
    >
      <img
        src={ searchIcon }
        alt="searchIcon"
        data-testid="search-top-btn"
      />
    </button>
  );
}

SearchHeader.propTypes = {
  handleClickSearch: PropTypes.func,
}.isRequired;

export default SearchHeader;
