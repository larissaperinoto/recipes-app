import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      searchClass: 'show',
    };
  }

  componentDidMount() {
    this.handleIcons();
  }

  handleIcons = () => {
    const { title } = this.props;
    if (title === '/favorite-recipes'
      || title === '/done-recipes'
      || title === '/profile') {
      this.setState({ searchClass: 'hide' });
    }
  }

  favoriteTitleGenerator = (title) => {
    const initialLetterF = title.split('/')[1][0].toUpperCase();
    const quiteLetterF = title.split('f')[1].toString().split('-')[0];
    const initialLetterR = title.split('-')[1][0].toUpperCase();
    const quiteLetterR = title.split('r')[2];
    return `${initialLetterF}${quiteLetterF} ${initialLetterR}${quiteLetterR}`;
  }

  doneTitleGenerator = (title) => {
    const initialLetterD = title.split('/')[1][0].toUpperCase();
    const quiteLetterD = title.split('d')[1].toString().split('-')[0];
    const initialLetterR = title.split('-')[1][0].toUpperCase();
    const quiteLetterR = title.split('r')[1];
    return `${initialLetterD}${quiteLetterD} ${initialLetterR}${quiteLetterR}`;
  }

  titleGenerator = () => {
    const { title } = this.props;
    if (title === '/done-recipes') {
      return this.doneTitleGenerator(title);
    }

    if (title === '/favorite-recipes') {
      return this.favoriteTitleGenerator(title);
    }
    const initialLetter = title.split('/')[1][0].toUpperCase();
    const finalLetter = title.split('/')[1].substring(1);
    return `${initialLetter}${finalLetter}`;
  }

  render() {
    const { searchClass } = this.state;
    return (
      <div>
        <profileIcon />
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
        <img
          scr={ searchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
          className={ searchClass }
        />
        <h1 data-testis="page-title">{ this.titleGenerator() }</h1>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
