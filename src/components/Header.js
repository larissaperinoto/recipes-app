import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [showSearchIcon, setshowSearchIcon] = useState(true);
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
      { showSearchIcon && <img
        src={ searchIcon }
        alt="searchIcon"
        data-testid="search-top-btn"
      /> }
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
