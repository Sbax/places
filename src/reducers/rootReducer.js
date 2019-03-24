import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import gapiReducer from './gapiReducer';

const rootReducer = combineReducers({
  gapiReducer,
  citiesReducer,
});

export default rootReducer;
