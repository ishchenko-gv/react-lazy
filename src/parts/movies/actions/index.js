import * as actionTypes from './action-types';

export const setMovieTitle = title => ({
  type: actionTypes.SET_MOVIE_TITLE,
  title
});

export const saveMovies = movies => ({
  type: actionTypes.SAVE_MOVIES,
  movies
});

export const addMovies = movies => ({
  type: actionTypes.ADD_MOVIES,
  movies
});
