import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  movies: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'movies/saveMovies':
      return {
        ...state,
        movies: action.movies
      };
    default:
      return state;
  }
};

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
