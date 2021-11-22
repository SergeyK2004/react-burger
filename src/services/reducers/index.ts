import { combineReducers } from 'redux';
import { burgerReducer } from './burgerReducers';
import { authReducer } from './authReducers';
import { wsReducer } from './wsReducers';

export const rootReducer = combineReducers({
  burgerReducer,
  authReducer,
  wsReducer,
});
