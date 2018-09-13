import React from 'react';
import './styles.css';

export const Search = () => (
  <form className="search">
    <input type="text" className="search__field" />
    <input type="submit" className="search__button" />
  </form>
);
