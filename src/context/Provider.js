import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [userEmail, setUserEmail] = useState({ user: { email: '', isValid: false } });
  const [userSenha, setUserSenha] = useState({ senha: { isValid: false } });

  const [recipeDetails, setRecipeDetails] = useState({
    details: [],
    ingredients: [],
    recomendations: [],
  });

  const value = {
    userEmail,
    setUserEmail,
    userSenha,
    setUserSenha,
    recipeDetails,
    setRecipeDetails,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf,
}.isRequired;

export default Provider;
