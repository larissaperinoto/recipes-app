import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Profile() {
  return (
    <Header title="Profile" />
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Profile;
