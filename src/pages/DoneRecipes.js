import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <Header title="Done Recipes" />
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default DoneRecipes;
