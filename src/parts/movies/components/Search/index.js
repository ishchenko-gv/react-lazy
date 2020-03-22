import React, {
  useEffect,
  createRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { connect } from 'react-redux';

import { findMoviesByTitle } from '../../../../services/api-request';
import createIntersectionObserver from '../../../../services/intersection-observer';
import Image from '../../../../kit/Image';
import styles from './styles.scss';
import { saveMovies } from '../../actions';

Search.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      year: PropTypes.string,
      prosterURL: PropTypes.string
    })
  ),
  onMoviesSave: PropTypes.func.isRequired
};

Search.defaultProps = {
  movies: null
};

function Search(props) {
  const { movies, onMoviesSave } = props;
  const { url } = useRouteMatch();
  const lastItemRef = createRef();
  const [pageCounter, setPageCounter] = useState(1);

  const fetchMovies = async title => {
    onMoviesSave(await findMoviesByTitle(title));
  };

  useEffect(() => {
    if (!lastItemRef.current) return;

    const observer = createIntersectionObserver(async ({ isIntersecting }) => {
      if (isIntersecting) onMoviesSave(await findMoviesByTitle('batman', pageCounter));
      setPageCounter(count => count + 1);
    });

    observer.observe(lastItemRef.current);

    return () => observer.disconnect();
  }, [lastItemRef.current]);

  useEffect(() => {
    fetchMovies('batman');
  }, []);

  const [handleInput] = useDebouncedCallback(fetchMovies, 400);

  return (
    <div>
      <h2>Movies</h2>
      <input
        type='text'
        onKeyUp={e => handleInput(e.target.value)}
      />
      <div className={styles.moviesWrap}>
        {movies && movies.map((movie, index, array) => {
          const isLastItem = index === array.length - 1;

          return (
            <div key={movie.id} ref={isLastItem ? lastItemRef : null}>
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
  movies: state.movies.list
});

const mapDispatch = dispatch => ({
  onMoviesSave: movies => dispatch(saveMovies(movies))
});

export default connect(mapState, mapDispatch)(Search);
