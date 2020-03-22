import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import movies from '../parts/movies/reducer';

const reducer = combineReducers({
  movies
});

const devtool = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f;

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    devtool
  )
);

export default store;
