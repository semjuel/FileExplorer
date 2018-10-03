import React, { Component } from 'react';
import './styles.css';
import { FilelistNavbar } from '../FilelistNavbar';

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <FilelistNavbar />
      </div>
    );
  }
}
