import http from '@app/http';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import history from '@app/router/history';

const middlewares =
  process.env.MODE === 'development'
    ? composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ api, push: history.push })))
    : applyMiddleware(thunk.withExtraArgument({ api, push: history.push }));

const store = createStore(rootReducer, middlewares);

// I have added this in the store, cause HTTP service is used
// by API service that a in the thunk middleware, so we get
// cycling dependencies Store -> HTTP -> Store -> ...
http.interceptors().response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      store.dispatch(logout());
    }

    errorService(error);

    throw error;
  },
);

export default store;
