import React, {
  useEffect,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { connect } from 'react-redux';

import styles from './styles.scss';

import Image from '../../../../kit/Image';
import { setMovieTitle } from '../../actions';
import useIntersectionObserver from '../../../../hooks/use-intersection-observer';
import areAllMoviesLoaded from '../../selectors/are-all-movies-loaded';
import fetchMovies from '../../actions/fetch-movies';

Search.propTypes = {
  movieTitle: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      year: PropTypes.string,
      prosterURL: PropTypes.string
    })
  ),
  areAllMoviesLoaded: PropTypes.bool.isRequired,
  onMovieTitleSet: PropTypes.func.isRequired,
  onMoviesFetch: PropTypes.func.isRequired
};

Search.defaultProps = {
  movieTitle: '',
  movies: []
};

function Search (props) {
  const {
    movieTitle,
    movies,
    areAllMoviesLoaded,
    onMovieTitleSet,
    onMoviesFetch
  } = props;

  const { url } = useRouteMatch();
  const lastItemRef = useRef(null);
  const [isIntersecting] = useIntersectionObserver(lastItemRef);
  const [debouncedOnMoviesFetch] = useDebouncedCallback(onMoviesFetch, 400);

  useEffect(() => {
    console.log('sdf');
    if (isIntersecting) onMoviesFetch();
  }, [isIntersecting]);

  useEffect(() => {
    if (!movieTitle) onMoviesFetch({ isInitial: true });
  }, []);

  const handleInput = value => {
    onMovieTitleSet(value);
    debouncedOnMoviesFetch({ clear: true });
  };

  return (
    <div className={styles.wrap}>
      <h2>Movies</h2>
      <input
        type='text'
        value={movieTitle}
        onChange={e => handleInput(e.target.value)}
      />
      <div className={styles.moviesWrap}>
        {movies && movies.map((movie, index, array) => {
          const isLastItem = index === array.length - 1;
          const elementRef = isLastItem && !areAllMoviesLoaded
            ? lastItemRef
            : null;

          return (
            <div key={`${movie.id}`} ref={elementRef}>
              <div>{movie.title}</div>
              <div>{movie.year}</div>
              <Link to={`${url}/${movie.id}`}>
                <Image width='300px' height='400px' src={movie.posterURL} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapState = state => ({
  movieTitle: state.movies.movieTitle,
  movies: state.movies.list,
  areAllMoviesLoaded: areAllMoviesLoaded(state)
});

const mapDispatch = dispatch => ({
  onMovieTitleSet: title => dispatch(setMovieTitle(title)),
  onMoviesFetch: opts => dispatch(fetchMovies(opts))
});

export default connect(mapState, mapDispatch)(Search);
