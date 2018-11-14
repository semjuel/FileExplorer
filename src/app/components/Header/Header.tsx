import React, { Component } from 'react';
import './styles.scss';

import { Logo } from '../Logo/Logo';
import { Search } from './Search/HeaderSearch';
import { FolderSettings } from '../FolderSettings/FolderSettings';
import { AppSettings } from '../AppSettings/AppSettings';

import Loader from '../Loader/Loader';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <Loader />
        <div className="header__part">
          <div className="header__logo">
            <Logo />
          </div>
          <div className="header__search">
            <Search />
          </div>
        </div>
        <div className="header__part">
          <FolderSettings />
          <AppSettings />
        </div>
      </header>
    );
  }
}
