import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [userEmail, setUserEmail] = useState({ user: { email: '', isValid: false } });
  const [userSenha, setUserSenha] = useState({ senha: { isValid: false } });
  const [dataFoods, setdataFoods] = useState([]);
  const [dataDrinks, setdataDrinks] = useState([]);
  const [recipeType, setRecipeType] = useState('');

  return (
    <Context.Provider
      value={ {
        userEmail,
        setUserEmail,
        userSenha,
        setUserSenha,
        dataFoods,
        setdataFoods,
        dataDrinks,
        setdataDrinks,
        recipeType,
        setRecipeType } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf,
}.isRequired;

export default Provider;
