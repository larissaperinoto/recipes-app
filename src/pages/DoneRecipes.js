import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class DoneRecipes extends Component {
  render() {
    const { history: { location: { pathname } } } = this.props;
    console.log('oi');
    return (
      <Header title={ pathname } />
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default DoneRecipes;
