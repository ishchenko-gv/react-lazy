import * as actionTypes from './action-types';

export const setMovieTitle = title => ({
  type: actionTypes.SET_MOVIE_TITLE,
  title
});

export const saveMovies = movies => ({
  type: actionTypes.SAVE_MOVIES,
  movies
});

export const setPageSize = size => ({
  type: actionTypes.SET_PAGE_SIZE,
  size
});
