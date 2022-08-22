import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import HeaderContext from '../context/HeaderContext';
import MealList from '../components/MealList';

function Foods() {
  const { searchData } = useContext(HeaderContext);
  return (
    <>
      <Header title="Foods" />
      {searchData.length > 1 && <MealList data={ searchData } />}
    </>

  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Foods;
