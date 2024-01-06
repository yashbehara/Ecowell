import { createStore, applyMiddleware, Store, AnyAction, Middleware, StoreEnhancer } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from './reducers';
import combinedSaga from './sagas';

//configure redux store and saga
const configureStore = (initialState?: any): Store<any, AnyAction> => {
  const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const composeEnhancers: StoreEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store: Store<any, AnyAction> = createStore(rootReducer, initialState, composeEnhancers);

  sagaMiddleware.run(combinedSaga);
  return store;
};

export default configureStore;
