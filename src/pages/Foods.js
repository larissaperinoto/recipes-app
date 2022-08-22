import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderContext from '../context/HeaderContext';
import MealList from '../components/MealList';

function Foods() {
  const { searchData } = useContext(HeaderContext);
  return (
    <>
      <Header title="Foods" />
      {searchData.length > 1 && <MealList data={ searchData } />}
      <Footer />
    </>
  );
}

export default Foods;
