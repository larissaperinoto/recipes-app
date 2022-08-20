import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Foods extends Component {
  render() {
    const { history: { location: { pathname } } } = this.props;
    console.log(pathname);
    return (
      <Header title={ pathname } />
    );
  }
}

Foods.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Foods;
