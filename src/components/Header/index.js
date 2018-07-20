import React, { Component } from 'react';
import './styles.css';

import { Logo } from '../Logo';
import { Search } from './Search';
import { FolderSettings } from '../FolderSettings';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <Logo />
        <Search />

        <FolderSettings />
      </header>
    );
  }
}
