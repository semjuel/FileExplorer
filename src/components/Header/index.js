import React, { Component } from 'react';
import './styles.css';

import { Logo } from '../Logo';
import { Search } from './Search';
import { FolderSettings } from '../FolderSettings';
import { AppSettings } from '../AppSettings';

import Loader from '../../components/Loader';

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
