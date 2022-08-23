import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Category from '../components/Category';

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <Category />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
