import { createSelector } from 'reselect';

export default createSelector(
  state => state.movies.list,
  state => state.movies.foundMoviesCount,
  (moviesList, moviesCount) =>
    moviesList && moviesCount ? moviesList.length === moviesCount : false
);
