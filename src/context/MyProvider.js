import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import requestMealsAPI from '../services/requestMealsAPI';

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

  const handleSearch = async () => {
    const { filter, value } = search;
    if (filter === 'First letter' && value.length !== 1) {
      setError(true);
    } else {
      const data = await requestMealsAPI(filter, value);
      setSearchData(data);
    }
  };

  const value = {
    handleSearchChange,
    handleSearch,
    error,
  };

  return (
    <MyContext.Provider value={ value }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
