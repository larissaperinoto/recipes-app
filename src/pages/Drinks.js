import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DrinkList from '../components/DrinkList';
import HeaderContext from '../context/HeaderContext';

function Drinks() {
  const { searchData } = useContext(HeaderContext);
  const recipesToShow = 12;
  return (
    <>
      <Header title="Drinks" />
      {searchData.length > 1 && <DrinkList data={ searchData.slice(0, recipesToShow) } />}
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Drinks;
