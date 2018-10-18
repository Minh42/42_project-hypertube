require("./assets/stylesheets/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';

const { persistor, store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
   , document.querySelector('.root'));

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', function () {
        var NextApp = require('./App').default
        ReactDOM.render(
        <Provider store={store}>
            <NextApp />
        </Provider>
       , document.querySelector('.root'));
    })
}
  