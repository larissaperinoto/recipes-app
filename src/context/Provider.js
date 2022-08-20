import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  return (
    <Context.Provider value>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf,
}.isRequired;

export default Provider;
