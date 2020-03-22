import { findMoviesByTitle } from 'services/api-request';
import { logError } from 'services/logger';

import areAllMoviesLoaded from '../selectors/are-all-movies-loaded';
import { saveMovies, setPageSize, clearMovies } from '../actions';

export default function fetchMovies (opts = {}) {
  return async (dispatch, getState) => {
    const { clear } = opts;
    const state = getState();
    const { list, pageSize, movieTitle, foundMoviesCount } = state.movies;
    const areAllLoaded = areAllMoviesLoaded(state);

    if (areAllLoaded) return;

    const page = pageSize
      ? Math.ceil(list.length / pageSize) + 1
      : 1;

    try {
      const movies = await findMoviesByTitle(movieTitle, page);

      if (!movies.list.length) return;

      if (!pageSize) dispatch(setPageSize(movies.list.length));

      const mergedList = clear
        ? movies.list
        : [...list, ...movies.list];

      const result = mergedList.reduce((acc, item, index, array) => {
        if (acc.ids.includes(item.id)) {
          acc.foundMoviesCount = acc.foundMoviesCount - 1;
          return acc;
        }

        const isLastItem = index === array.length - 1;

        acc.list.push(item);

        if (isLastItem) {
          acc.ids = undefined;
        } else {
          acc.ids.push(item.id);
        }

        return acc;
      }, {
        list: [],
        ids: [],
        foundMoviesCount: list.length ? foundMoviesCount : movies.foundMoviesCount
      });

      dispatch(saveMovies(result));
    } catch (e) {
      dispatch(clearMovies());
      logError(e);
    }
  };
}
