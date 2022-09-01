import React from 'react';
import { Header, Footer, Recipes, Category } from '../components/index';

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
