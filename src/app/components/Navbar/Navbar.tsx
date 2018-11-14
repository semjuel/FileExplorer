import React, { Component } from 'react';
import './styles.scss';
import { FilelistNavbar } from '../FilelistNavbar/FilelistNavbar';

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <FilelistNavbar />
      </div>
    );
  }
}
