import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import HeaderSearchIcon from './HeaderSearchIcon';
import SearchBar from './SearchBar';
import Context from '../../context/Context';

function Header({ title }) {
  const [showSearchIcon, setshowSearchIcon] = useState(true);
  const [showSearchInput, setshowSearchInput] = useState(false);

  const {
    handleSearchChange,
    error,
    searchData } = useContext(Context);

  const history = useHistory();

  const handleIcons = () => {
    if (title === 'Favorite Recipes'
    || title === 'Done Recipes'
      || title === 'Profile') {
      setshowSearchIcon(false);
    }
  };

  const handleClickProfile = () => {
    history.push('/profile');
  };

  const handleShowInput = () => {
    setshowSearchInput(!showSearchInput);
  };

  useEffect(() => handleIcons(), []);

  useEffect(() => {
    if (searchData.length === 1) {
      const pathname = history.location;
      const type = pathname.pathname.split('/')[1];
      const id = type === 'foods' ? searchData[0].idMeal : searchData[0].idDrink;
      history.push(`/${type}/${id}`);
    }
  }, [searchData]);

  return (
    <div>
      { error && global.alert(error) }
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
      { showSearchIcon && <HeaderSearchIcon handleShowInput={ handleShowInput } /> }
      { showSearchInput
        && <input
          type="text"
          data-testid="search-input"
          name="value"
          onChange={ handleSearchChange }
        /> }
      { showSearchInput && <SearchBar /> }
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
