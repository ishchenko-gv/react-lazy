import React, { useEffect, useState, useRef, createRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { findMoviesByTitle } from '../../services/api-request';
import Image from '../../kit/Image';

function Search(props) {
  const { movies, onMoviesSave } = props;
  const { url } = useRouteMatch();
  const [pageCounter, setPageCounter] = useState(1);
  const lastItemRef = useRef(createRef());

  useEffect(() => {
    const fetchMovies = async () => {
      onMoviesSave(await findMoviesByTitle('batman'))
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <input type='text' onChange={async e => setMovies(await findMoviesByTitle(e.target.value))} />
      {movies && movies.map((movie, index, array) => {
        const isLastItem = index === array.length - 1;

        return (
          <div key={movie.id}>
          <div>{movie.title}</div>
          <div>{movie.year}</div>
          <Link ref={isLastItem ? lastItemRef : null} to={`${url}/${movie.id}`}>
            <Image width={300} height={400} src={movie.posterURL} />
          </Link>
        </div>
        )
      })}
    </div>
  );
}

const mapState = state => ({
  movies: state.movies
})

const mapDispatch = dispatch => ({
  onMoviesSave: movies => dispatch({ type: 'movies/saveMovies', movies })
})

export default connect(mapState, mapDispatch)(Search);