import * as actionTypes from '../actions/action-types';

const initialState = {
  movieTitle: 'batman',
  list: []
};

export default function movies(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MOVIE_TITLE:
      return {
        ...state,
        movieTitle: action.title
      };
    case actionTypes.SAVE_MOVIES:
      return {
        ...state,
        list: action.movies
      };
    case actionTypes.ADD_MOVIES:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.movies
        ]
      };
    default:
      return state;
  }
}
