import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { connect } from 'react-redux';

import { findMoviesByTitle } from '../../../../services/api-request';
import Image from '../../../../kit/Image';
import styles from './styles.scss';
import { setMovieTitle, saveMovies, addMovies } from '../../actions';
import useIntersectionObserver from './use-intersection-observer';

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
  onMovieTitleSet: PropTypes.func.isRequired,
  onMoviesSave: PropTypes.func.isRequired,
  onMoviesAdd: PropTypes.func.isRequired
};

Search.defaultProps = {
  movieTitle: '',
  movies: []
};

function Search(props) {
  const {
    movieTitle,
    movies,
    onMovieTitleSet,
    onMoviesSave,
    onMoviesAdd
  } = props;
  const { url } = useRouteMatch();
  const lastItemRef = useRef(null);
  const [pageCounter, setPageCounter] = useState(1);
  const [isIntersecting] = useIntersectionObserver(lastItemRef);

  const initialFetchMovies = async title => {
    setPageCounter(1);
    onMoviesSave(await findMoviesByTitle(title));
  };

  const additionalFetchMovies = async (title, conuter) => {
    onMoviesAdd(await findMoviesByTitle(title, conuter));
  };

  const [initialFetchMoviesDebounce] = useDebouncedCallback(initialFetchMovies, 400);

  useEffect(() => {
    if (isIntersecting) {
      additionalFetchMovies(movieTitle, pageCounter);
      setPageCounter(count => count + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    initialFetchMovies(movieTitle);
  }, []);

  const handleInput = value => {
    onMovieTitleSet(value);
    initialFetchMoviesDebounce(value);
  };

  return (
    <div>
      <h2>Movies</h2>
      <input
        type='text'
        value={movieTitle}
        onChange={e => handleInput(e.target.value)}
      />
      <div className={styles.moviesWrap}>
        {movies && movies.map((movie, index, array) => {
          const isLastItem = index === array.length - 1;

          return (
            <div key={`${movie.id}`} ref={isLastItem ? lastItemRef : null}>
              <div>{movie.title}</div>
              <div>{movie.year}</div>
              <Link
                to={`${url}/${movie.id}`}
              >
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
  movies: state.movies.list
});

const mapDispatch = dispatch => ({
  onMovieTitleSet: title => dispatch(setMovieTitle(title)),
  onMoviesSave: movies => dispatch(saveMovies(movies)),
  onMoviesAdd: movies => dispatch(addMovies(movies))
});

export default connect(mapState, mapDispatch)(Search);
