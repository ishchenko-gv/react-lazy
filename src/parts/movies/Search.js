import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { searchMovie, getMovieById } from '../../services/api-request';

export default function Search() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);

  const fetchMovies = async () => {
    setMovies(await searchMovie('batman'))
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <input type='text' onChange={async e => setMovies(await searchMovie(e.target.value))} />
      {movies && movies.map(movie => (
        <div key={movie.imdbID}>
          <div>{movie.Title}</div>
          <div>{movie.Year}</div>
          <Link to={`${url}/${movie.imdbID}`}>
            <img src={movie.Poster} onMouseEnter={() => getMovieById(movie.imdbID)} />
          </Link>
        </div>
      ))}
    </div>
  );
}