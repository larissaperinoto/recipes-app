import React from 'react';
import { Category, Footer, Header, Recipes } from '../components/index';

export default function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <Category />
      <Recipes />
      <Footer />
    </>
  );
}
