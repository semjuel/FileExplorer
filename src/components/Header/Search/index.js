import React from 'react';
import './styles.css';

export const Search = () => (
  <form className="search">
    <input type="text" className="search__field" placeholder="Search.." />
    <button className="search__button">
      S
    </button>
  </form>
);
