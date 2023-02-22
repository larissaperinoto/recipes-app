import React from 'react';
import { func } from 'prop-types';
import { Button } from '@mui/material';
import searchIcon from '../../images/searchIcon.svg';

function HeaderSearchIcon({ handleShowInput }) {
  return (
    <Button
      type="button"
      onClick={ handleShowInput }
    >
      <img
        src={ searchIcon }
        alt="searchIcon"
      />
    </Button>
  );
}

HeaderSearchIcon.propTypes = {
  handleShowInput: func,
}.isRequired;

export default HeaderSearchIcon;
