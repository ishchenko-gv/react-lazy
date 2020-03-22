import * as actionTypes from '../actions/action-types';

const initialState = {
  movieTitle: '',
  list: [],
  foundMoviesCount: 0,
  pageSize: 0
};

export default function movies (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MOVIE_TITLE:
      return {
        ...state,
        movieTitle: action.title
      };
    case actionTypes.SAVE_MOVIES:
      return {
        ...state,
        list: action.movies.list,
        foundMoviesCount: action.movies.foundMoviesCount
      };
    case actionTypes.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.size
      };
    default:
      return state;
  }
}
