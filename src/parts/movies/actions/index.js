import * as actionTypes from './action-types';

export const saveMovies = movies => ({
  type: actionTypes.SAVE_MOVIES,
  movies
});
