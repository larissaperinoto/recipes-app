import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchHeader from './searchIcon';

function Header({ title }) {
  const [showSearchIcon, setshowSearchIcon] = useState(true);
  const [showSearchInput, setshowSearchInput] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleIcons = () => {
    if (title === 'Favorite Recipes'
      || title === 'Done Recipes'
      || title === 'Profile') {
      setshowSearchIcon(false);
    }
  };

  const handleClickProfile = () => {
    setRedirect(true);
  };

  const handleClickSearch = () => {
    setshowSearchInput(!showSearchInput);
  };

  useEffect(() => {
    handleIcons();
  }, []);

  return (
    <div>
      { redirect && <Redirect to="/profile" />}
      <button
        type="button"
        onClick={ () => handleClickProfile() }
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </button>
      { showSearchIcon && <SearchHeader handleClickSearch={ handleClickSearch } /> }
      { showSearchInput && <input type="text" data-testid="search-input" /> }
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
