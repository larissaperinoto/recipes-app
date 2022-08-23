import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Category from '../components/Category';

function Foods() {
  return (
    <>
      <Header title="Foods" />
      <Category />
      <Recipes />
      <Footer />
    </>
  );
}

export default Foods;
