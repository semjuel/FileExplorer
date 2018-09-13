import React, { Component } from 'react';
import './styles.css';
import { Header } from '../../components/Header';
import { Navbar } from '../../components/Navbar';
import { Subbar } from '../../components/Subbar';
import Loader from '../../components/Loader';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Loader />
        <Header />
        <main className="main">
          <Navbar />
          <div className="layout">
            layout
          </div>
          <Subbar />
        </main>
      </div>
    );
  }
}

export default App;
