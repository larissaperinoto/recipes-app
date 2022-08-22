import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkList from '../components/DrinkList';
import HeaderContext from '../context/HeaderContext';

function Drinks() {
  const { searchData } = useContext(HeaderContext);
  const recipesToShow = 12;
  return (
    <>
      <Header title="Drinks" />
      {searchData.length > 1 && <DrinkList data={ searchData.slice(0, recipesToShow) } />}
      <Footer />
    </>
  );
}

export default Drinks;
