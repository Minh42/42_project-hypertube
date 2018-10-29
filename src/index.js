import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/stylesheets/main.scss';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

const { persistor, store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
