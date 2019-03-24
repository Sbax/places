import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const persistConfig = {
  key: 'places',
  storage: storageSession,
  whitelist: ['citiesReducer'],
};

const composeEnhancers = (() => {
  /* eslint-disable no-underscore-dangle */
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  }

  return compose;
  /* eslint-enable */
})();

const enhancer = composeEnhancers(applyMiddleware(thunk));

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(
    persistedReducer, // root reducer with router state
    {},
    enhancer
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
