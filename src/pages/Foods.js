import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Foods() {
  return (
    <Header title="Foods" />
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Foods;
