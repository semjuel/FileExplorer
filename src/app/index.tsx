import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import http from '@app/http';
import App from './App';
import store from './store';

// Set default settings for axios.
http.defaults().headers.common['Accept'] = 'application/json';

class Application extends Component {
  state = {
    stripe: null,
  };

  render() {
    return (
      <Provider store={store}>
          <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));
