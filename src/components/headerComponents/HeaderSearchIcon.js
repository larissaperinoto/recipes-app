import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';

function HeaderSearchIcon({ handleShowInput }) {
  return (
    <button
      type="button"
      onClick={ handleShowInput }
    >
      <img
        src={ searchIcon }
        alt="searchIcon"
        data-testid="search-top-btn"
      />
    </button>
  );
}

HeaderSearchIcon.propTypes = {
  handleShowInput: PropTypes.func,
}.isRequired;

export default HeaderSearchIcon;
