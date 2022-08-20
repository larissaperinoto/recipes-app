import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    const { history: { location: { pathname } } } = this.props;
    return (
      <Header title={ pathname } />
    );
  }
}

Profile.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Profile;
