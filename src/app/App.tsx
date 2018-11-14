import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import './style.scss';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        {/* <NotificationsWrapper /> */}
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

export default (process.env.MODE === 'development' ? hot(module)(App) : App);
