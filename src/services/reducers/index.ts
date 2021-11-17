import { combineReducers } from 'redux';
import { burgerReducer } from './burgerReducers.js';
import { authReducer } from './authReducers.js';

export const rootReducer = combineReducers({
  burgerReducer,
  authReducer,
});
