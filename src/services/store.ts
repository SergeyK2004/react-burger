import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';

export default function configureStore() {
  const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;


  const wsCreatedMiddleware = socketMiddleware()
  const enhancer = composeEnhancers(applyMiddleware(thunk, wsCreatedMiddleware));

  const store = createStore(rootReducer, enhancer);
  return store;
}
