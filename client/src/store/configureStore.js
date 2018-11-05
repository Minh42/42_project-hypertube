import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { init as socketInit, emit } from '../reducers/reducer_socket';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const reducers = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
    const store = createStore(
        reducers,
        compose(
            applyMiddleware(reduxThunk.withExtraArgument({ emit })),
            window.devToolsExtension ? window.devToolsExtension() : f => f // initialize devToolsExtension
        )
    ) 
    
    const persistor = persistStore(store);

    if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer)
      });
    }

    socketInit(store);
  
    return { persistor, store };
}