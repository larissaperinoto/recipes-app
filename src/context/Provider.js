import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  // Header
  const [search, setSearch] = useState({
    value: '',
    filter: '',
  });

  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState('');

  const handleSearchChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  // Login
  const [userEmail, setUserEmail] = useState({ user: { email: '', isValid: false } });
  const [userSenha, setUserSenha] = useState({ senha: { isValid: false } });

  // Recipe
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);

  // Recipe Details
  const [recipeDetails, setRecipeDetails] = useState({
    details: [],
    ingredients: [],
    recomendations: [],
  });
  console.log(recipeDetails);

  const value = {
    setSearch,
    search,
    error,
    searchData,
    setError,
    setSearchData,
    handleSearchChange,
    userEmail,
    setUserEmail,
    userSenha,
    setUserSenha,
    recipeDetails,
    setRecipeDetails,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
    toggleFilter,
    setToggleFilter,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
