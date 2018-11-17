import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/stylesheets/main.scss';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_en from "./translations/en/common.json";
import common_fr from "./translations/fr/common.json";
import Reload from './utils/HOC/Reload';
import axios from 'axios';

const { persistor, store } = configureStore();
axios.defaults.withCredentials = true;

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'fr',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        fr: {
            common: common_fr
        },
    },
});

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <Provider store={store}>
            <Reload>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Reload>
        </Provider>
    </I18nextProvider>
    , document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', function () {
        var NextApp = require('./App').default
        ReactDOM.render(
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <NextApp />
            </Provider>
        </I18nextProvider>
       , document.querySelector('.root'));
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
