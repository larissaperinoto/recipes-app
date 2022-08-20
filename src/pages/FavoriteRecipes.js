import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <Header title="Favorite Recipes" />
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default FavoriteRecipes;
