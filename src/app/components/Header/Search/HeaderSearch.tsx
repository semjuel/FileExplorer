import React from 'react';
import './styles.scss';

export const Search = () => (
  <form className="search">
    <input type="text" className="search__field" placeholder="Search.." />
    <button className="search__button">
      S
    </button>
  </form>
);
