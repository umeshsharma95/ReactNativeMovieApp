import { createStore, applyMiddleware, compose } from 'redux';
//import thunk for doing asynchronous operations in redux
import thunk from 'redux-thunk';
//import reducer from our reducer file
import reducer from './reducer';

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null) || compose;
    
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

//export const store = createStore(reducer, applyMiddleware(thunk));