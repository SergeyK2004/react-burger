import { combineReducers } from 'redux';
import { burgerReducer } from './burgerReducers.js';

export const rootReducer = combineReducers({
  burgerReducer,
});
