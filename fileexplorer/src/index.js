import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SnackbarProvider } from 'notistack';

const store = createStore(combineReducers({ app: reducers }));

// const store = createStore(rootReducer, composeWithDevTools(
//     // @TODO why we need this: applyMiddleware(...middleware),
//     // other store enhancers if any
// ));

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
            <App />
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
