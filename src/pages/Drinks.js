import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks() {
  return (
    <Header title="Drinks" />
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Drinks;
