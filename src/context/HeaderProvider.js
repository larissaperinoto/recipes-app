import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';
import { requestMealsAPI, requestDrinksAPI } from '../services/requestMealsAndDrinksAPI';

function MyProvider({ children }) {
  const [search, setSearch] = useState({
    value: '',
    filter: '',
  });

  const handleSearchChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  const [searchData, setSearchData] = useState([]);
  console.log(searchData);
  const [error, setError] = useState(false);
  const [path, setPath] = useState('');

  const handleSearch = async () => {
    const { filter, value } = search;
    if (filter === 'First letter' && value.length !== 1) {
      setError(true);
    }
    if (path === 'Foods') {
      const data = await requestMealsAPI(filter, value);
      setSearchData(data);
    } else {
      const data = await requestDrinksAPI(filter, value);
      setSearchData(data);
    }
  };

  const value = {
    handleSearchChange,
    handleSearch,
    error,
    setPath,
  };

  return (
    <HeaderContext.Provider value={ value }>
      { children }
    </HeaderContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
