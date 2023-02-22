import React, { useEffect, useState, useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { IconButton, Typography, Stack, Container } from '@mui/material';
import profileIcon from '../../images/profileIcon.svg';
import HeaderSearchIcon from './HeaderSearchIcon';
import SearchBar from './SearchBar';
import Context from '../../context/Context';

export default function Header({ title }) {
  const [showSearchIcon, setshowSearchIcon] = useState(true);
  const [showSearchInput, setshowSearchInput] = useState(false);

  const { error } = useContext(Context);
  const history = useHistory();

  const handleIcons = () => {
    if (title === 'Favorite Recipes'
    || title === 'Done Recipes'
      || title === 'Profile') {
      setshowSearchIcon(false);
    }
  };

  const handleShowInput = () => {
    setshowSearchInput(!showSearchInput);
  };

  useEffect(() => handleIcons(), []);

  return (
    <Container maxWidth="lg" sx={ { textAlign: 'center' } } className="header_container">
      { error && global.alert(error) }
      <Stack direction="row" spacing={ 2 } sx={ { mt: 2, ml: 2 } }>
        <IconButton
          type="button"
          variant="contained"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="Profile Settings" />
        </IconButton>
        { showSearchIcon && <HeaderSearchIcon handleShowInput={ handleShowInput } /> }
      </Stack>
      { showSearchInput && <SearchBar /> }
      <Typography variant="h2" sx={ { padding: 5 } }>{ title }</Typography>
    </Container>
  );
}

Header.propTypes = {
  title: string,
}.isRequired;
