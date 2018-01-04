import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import middlewares from '../config/middlewares';
import rootReducer from '../dux';
// import { preloadRequiredData } from '../dux/helpers';


const initStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  // store.dispatch(preloadRequiredData());

  return store;
};

export default initStore;
