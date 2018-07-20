import React, { Component } from 'react';
import './styles.css';
import Header from '../Header';
import Navbar from '../Navbar';
import Subbar from '../Subbar';

class App extends Component {
  render() {
    return (
      <div className="app">
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
